import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";
import router from "@/router";

export default class CustomerService {
  static proviceBalanceFormData() {
    return {
      amount: "0",
      payment_method: "",
    };
  }

  static providePaymentMethodOptions() {
    return ["PayPal", "Kreditkarte", "Rechnung", "Bitcoin"];
  }

  static async tryTopUpBalance(balanceFormData, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.INCREASE_BALANCE);
    const validationError = FormValidatorService.validateForm(balanceFormData.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    try {
      const result = await CustomerService.postTopUpBalance(balanceFormData.value, authStore);

      if (!result.success) {
        ToasterService.createToasterPopUp("error", "Fehler beim Aufladen deines Guthabens");
        return;
      }

      ToasterService.createToasterPopUp("success", "Guthaben erfolgreich aufgeladen!");
      authStore.setBalance(result.data.balance);
      balanceFormData.value = CustomerService.proviceBalanceFormData();
      return;
    } catch (error) {
      console.error(error);
      ToasterService.createDefaultErrorPopUp();
    }
  }

  static async postTopUpBalance(balanceFormData, authStore) {
    const data = {
      amount: balanceFormData.amount,
    };

    return await axios
      .post(
        `/api/v1/users/me/top-up`, // TODO: use request body once available
        data,
        {
          headers: AuthService.getAuthorizedHeaders(authStore),
        },
      )
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error(error);
        return { success: false, data: [] };
      });
  }

  // Provides an empty form structure for ticket purchases for initializing the form data in components.
  static provideTicketPurchaseFormData() {
    return {
      name: "",
      address: "",
      zip_code: "",
      ticket_count: "1",
      voucher_code: "",
    };
  }

  static calculateSingleTicketPrice(event) {
    const singleTicketPrice = event.base_price * event.pay_fee;
    return singleTicketPrice;
  }

  static calculateMinTicketPurchasePrice(event, ticketPurchaseFormData) {
    const minPrice = event.base_price * ticketPurchaseFormData.ticket_count;
    return minPrice;
  }

  static calculateTotalTicketPurchasePrice(singleTicketPrice, ticketPurchaseFormData, appliedVoucher, minPrice) {
    let totalCost = singleTicketPrice * ticketPurchaseFormData.ticket_count;

    if (appliedVoucher) {
      totalCost -= appliedVoucher.amount;
    }

    // check that price after discount is not higher than base_price of tickets
    if (totalCost < minPrice) {

      return {
        cost: minPrice,
        info: "Info: Das Einlösen dieses Gutscheins unterschreitet den Basispreis des Tickets, weshalb nicht der komplette Betrag eingelöst werden kann.",
      };
    }

    return { cost: totalCost, info: "" };
  }

  static calculateBalanceAfterPurchase(currentBalance, totalCost) {
    const balanceAfterPurchase = currentBalance - totalCost;
    return balanceAfterPurchase;
  }

  static getBalanceAfterPurchaseHighlightClass(balance) {
    if (balance < 0) {
      return "highlight-red";
    } else {
      return "";
    }
  }

  static getAppliedVoucherFromCode(ticketPurchaseFormData, availableVouchers) {
    return availableVouchers.value.find((voucher) => voucher.title === ticketPurchaseFormData.voucher_code); //TODO: fix error when no vouchers found
  }

  static getEventCardInfo(event) {
    const remaining_tickets = event.total_tickets - event.sold_tickets;

    if (remaining_tickets <= 0) {
      return { sold_out: true, cssClass: "bg-grey", to: "" };
    } else {
      return {
        sold_out: false,
        cssClass: "bg-customer",
        to: "/customer/purchase_ticket"
      };
    }
  }

  static async tryGetAllEvents() {
    const result = await CustomerService.fetchAllEvents();

    if (!result.success) {
      ToasterService.createToasterPopUp("error", "Events konnten nicht geladen werden");
    } 
    
    return result.data;
  }

  static async fetchAllEvents() {
    return await axios
      .get("/api/v1/events/", {
        headers: AuthService.getBasicHeaders(),
      })
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        return { success: false, data: [] };
      });
  }

  static async tryGetAllVouchersForCustomer(authStore) {
    const response = await CustomerService.fetchAllVouchersForCustomer(authStore);

    if (!response.success) {
      ToasterService.createToasterPopUp("error", "Fehler beim Laden der Gutscheine");
    }

    return response.data;
  }

  static async fetchAllVouchersForCustomer(authStore) {
    return await axios
      .get("/api/v1/vouchers/me", {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error fetching vouchers for user:", error);
        return { success: false, data: [] };
      });
  }

  static async tryGetAllTicketsForCustomer(authStore) {
    const response = await CustomerService.fetchAllTicketsForCustomer(authStore);

    if (!response.success) {
      ToasterService.createToasterPopUp("error", "Fehler beim Laden der Tickets");
    }

    return response.data;
  }

  static async fetchAllTicketsForCustomer(authStore) {
    return await axios
      .get("/api/v1/tickets/my-tickets", {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error fetching tickets for user:", error);
        return { success: false, data: [] };
      });
  }

  static async tryPurchaseTicket(ticketPurchaseFormData, balanceAfterPurchase, event, appliedVoucher, authStore) {
    // validate form data
    const validationRules = FormValidatorService.getValidationRules(FormTypes.PURCHASE_TICKET);
    const validationError = FormValidatorService.validateForm(ticketPurchaseFormData, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    // check if user has sufficient funds
    if (balanceAfterPurchase < 0) {
      ToasterService.createToasterPopUp("error", "Nicht genügend Guthaben.");
      return;
    }

    // check if enough tickets are available
    const remainingTickets = event.total_tickets - event.sold_tickets;
    if (remainingTickets - ticketPurchaseFormData.ticket_count < 0) {
      ToasterService.createToasterPopUp(
        "error",
        `Nicht genügend Tickets vorhanden. Verbleibende Tickets: ${remainingTickets}`,
      );
      return;
    }

    try {
      const response = await CustomerService.postPurchaseTicketData(
        ticketPurchaseFormData,
        event,
        appliedVoucher,
        authStore,
      );

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Fehler beim Kauf des Tickets.");
        return;
      }

      ToasterService.createToasterPopUp("success", "Ticket erfolgreich gekauft");
      authStore.setBalance(response.data.user.balance);
      router.push({ name: "CTickets" });
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      ToasterService.createDefaultErrorPopUp();
    }
  }

  static async postPurchaseTicketData(ticketPurchaseFormData, event, appliedVoucher, authStore) {
    // get id of applied voucher if exists
    const appliedVoucherId = appliedVoucher ? appliedVoucher.id : "";

    const data = {
      event_id: event.id,
      quantity: ticketPurchaseFormData.ticket_count,
      voucher_id: appliedVoucherId,
    };

    return await axios
      .post("/api/v1/tickets/buy", data, {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error purchasing ticket:", error);
        return { success: false, data: [] };
      });
  }
}

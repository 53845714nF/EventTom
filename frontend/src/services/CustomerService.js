import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";
import router from "@/router";

export default class CustomerService {
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
    return event.base_price * event.pay_fee;
  }

  static calculateTotalTicketPurchasePrice(singleTicketPrice, ticketPurchaseFormData, appliedVoucher) {
    let totalPrice = singleTicketPrice * ticketPurchaseFormData.ticket_count;

    if (appliedVoucher) {
      totalPrice -= appliedVoucher.amount;
    }

    // in case discount is higher than total price
    if (totalPrice < 0) {
      totalPrice = 0;
    }

    return totalPrice;
  }

  static getAppliedVoucherFromCode(ticketPurchaseFormData, availableVouchers) {
    return availableVouchers.value.find((voucher) => voucher.title === ticketPurchaseFormData.voucher_code); // undefined if not found
  }

  static async tryGetAllEvents() {
    const result = await CustomerService.fetchAllEvents();

    if (result.success) {
      return result.data;
    } else {
      ToasterService.createToasterPopUp("error", "Events konnten nicht geladen werden");
    }
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

  static async tryPurchaseTicket(ticketPurchaseFormData, event, appliedVoucher, authStore) {
    // validate form data
    const validationRules = FormValidatorService.getValidationRules(FormTypes.PURCHASE_TICKET);
    const validationError = FormValidatorService.validateForm(ticketPurchaseFormData, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    try {
      const response = await CustomerService.postPurchaseTicketData(ticketPurchaseFormData, event, authStore);

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Fehler beim Kauf des Tickets.");
        return;
      }

      // delete voucher if applied
      if (appliedVoucher) {
        const deleteVoucherResponse = await CustomerService.deleteVoucher(appliedVoucher, authStore);

        if (!deleteVoucherResponse.success) {
          ToasterService.createToasterPopUp("error", "Gutschein konnte nicht gelöscht werden.");
          return;
        }
      }

      ToasterService.createToasterPopUp("success", "Ticket erfolgreich gekauft");
      router.push({ name: "CTickets" });
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      ToasterService.createToasterPopUp("error", "Ein unerwarteter Fehler ist aufgetreten.");
    }
  }

  static async postPurchaseTicketData(ticketPurchaseFormData, event, authStore) {
    return await axios
      .post(
        `/api/v1/tickets/${event.id}/buy?event_id=${event.id}&quantity=${ticketPurchaseFormData.ticket_count}`,
        {},
        {
          headers: AuthService.getAuthorizedHeaders(authStore),
        },
      )
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error purchasing ticket:", error);
        return { success: false, data: [] };
      });
  }

  static async deleteVoucher(voucher, authStore) {
    return await axios
      .delete(
        `/api/v1/vouchers/${voucher.id}`,
        {},
        {
          headers: AuthService.getAuthorizedHeaders(authStore),
        },
      )
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.error("Error purchasing ticket:", error);
        return { success: false, data: [] };
      });
  }
}

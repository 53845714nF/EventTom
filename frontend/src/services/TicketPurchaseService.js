import axios from "axios";
import ToasterService from "@/services/ToasterService";

export default class TicketPurchaseService {
  /**
   * Mocked purchase ticket API call for local testing
   * Replace this with a real API call when backend is ready
   */
  static async purchaseTicket(ticketData) {
    try {
      // Simulate a backend API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (ticketData.name && ticketData.ticketCount > 0) {
            resolve({ success: true });
          } else {
            reject(new Error("Invalid ticket data. Please check your inputs."));
          }
        }, 500); // Simulate network delay
      });
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      ToasterService.createToasterPopUp(
        "error",
        error.message || "Ticket purchase failed. Please try again."
      );
      throw error;
    }
  }

  /**
   * Mocked validate voucher API call for local testing
   * Replace this with a real API call when backend is ready
   */
  static async validateVoucherCode(voucherCode) {
    try {
      // Simulate a backend API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (voucherCode === "ASLDKS83NLSDFJ983") {
            resolve({ valid: true, discount: 20 });
          } else {
            resolve({ valid: false, discount: 0 });
          }
        }, 500); // Simulate network delay
      });
    } catch (error) {
      console.error("Error validating voucher code:", error);
      ToasterService.createToasterPopUp(
        "error",
        "Error validating voucher code. Please try again."
      );
      return { valid: false, discount: 0 };
    }
  }

  /**
   * Production-ready ticket purchase API call
   */
  static async purchaseTicketReal(ticketData) {
    try {
      const response = await axios.post("/api/v1/purchase-ticket", ticketData);
      ToasterService.createToasterPopUp("success", "Ticket purchase successful! 🎉");
      return response.data;
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      ToasterService.createToasterPopUp(
        "error",
        error.response?.data?.message || "Ticket purchase failed. Please try again."
      );
      throw error;
    }
  }

  /**
   * Production-ready voucher validation API call
   */
  static async validateVoucherCodeReal(voucherCode) {
    try {
      const response = await axios.get(`/api/v1/validate-voucher/${voucherCode}`);
      ToasterService.createToasterPopUp(
        "success",
        response.data.valid
          ? `Voucher applied: -${response.data.discount}€`
          : "Invalid voucher code."
      );
      return response.data;
    } catch (error) {
      console.error("Error validating voucher code:", error);
      ToasterService.createToasterPopUp(
        "error",
        "Error validating voucher code. Please try again."
      );
      return { valid: false, discount: 0 };
    }
  }
}

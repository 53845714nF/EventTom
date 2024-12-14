import axios from "axios";

export default class TicketPurchaseService {
  static async purchaseTicket(ticketData) {
    try {
      // Simulated API call for ticket purchase
      const response = await axios.post("/api/v1/purchase-ticket", ticketData);
      return response.data;
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      throw new Error("Ticket purchase failed. Please try again.");
    }
  }

  static async validateVoucherCode(voucherCode) {
    try {
      // Simulated API call for voucher validation
      const response = await axios.get(`/api/v1/validate-voucher/${voucherCode}`);
      return response.data;
    } catch (error) {
      console.error("Error validating voucher code:", error);
      return { valid: false, discount: 0 };
    }
  }
}

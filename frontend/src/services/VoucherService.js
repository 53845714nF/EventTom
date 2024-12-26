import axios from "axios";
import AuthService from "@/services/AuthService"; 
import ToasterService from "./ToasterService";

export default class VoucherService {

  static async tryGetAllVouchersForUser(authStore) {
    const response = await VoucherService.fetchAllVouchersForUser(authStore);

    if (!response.success) {
      ToasterService.createToasterPopUp("error", "Fehler beim Laden der Gutscheine");
    }
    
    return response.data;
  }

  static async fetchAllVouchersForUser(authStore) {
    // Include the authorization headers
    return await axios.get(`/api/v1/vouchers/user/${authStore.userId}`, {
      headers: AuthService.getAuthorizedHeaders(authStore) // AuthService.getAuthorizedHeaders(authStore); needs authStore as argument
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((error) => {
      console.error("Error fetching vouchers for user:", error);
      return { success: false, data: [] };
    }); 
  }
}
import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";

export default class CustomerService{

  // Provides an empty form structure for ticket purchases for initializing the form data in components.
  static provideEmptyForm = () => {
    return {
      name: "",  
      address: "",  
      cityZip: "",  
      ticketCount: 1,  
      voucherCode: "",  
    };
  };

  static async tryGetAllEvents(){
    const result = await CustomerService.fetchAllEvents()

    if(result.success){
      return result.data;
    }
    else{
      ToasterService.createToasterPopUp("error", "Events konnten nicht geladen werden");
    }
  }

  static async fetchAllEvents(){
    return await axios.get("/api/v1/events/", {
      headers: AuthService.getBasicHeaders()
    })
    .then(response => {
      return {success: true, data: response.data};
    })
    .catch(error => {
      console.error("Error fetching events:", error);
      return {success: false, data: []};
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

  
  // Validates a voucher code.
  // Uses the TicketPurchaseService to validate the voucher and return the response.
  // static async validateVoucher(voucherCode) {
  //   try {
  //     const response = await TicketPurchaseService.validateVoucherCode(voucherCode); // Call the service to validate
  //     return response;  
  //   } catch (error) {
  //     console.error("Error validating voucher code:", error); // Log any errors
  //     return { valid: false, discount: 0 }; // Return a default invalid response in case of errors
  //   }
  // };

}



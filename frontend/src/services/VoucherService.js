import axios from "axios";
import AuthService from "@/services/AuthService"; 
export const fetchAllVouchersForUser = async (userId) => {
  try {
    // Include the authorization headers
    const headers = AuthService.getAuthorizedHeaders();
    const response = await axios.get(`/api/v1/vouchers/user/${userId}`, { headers });
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching vouchers:", error);  // Debugging
    return []; // Return an empty array on error
  }
};

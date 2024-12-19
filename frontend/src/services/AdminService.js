import { ref } from "vue";
import { Roles } from "@/constants/Roles";
import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";

export default class AdminService {
  static provideEmptyUser() {
    return ref({
      full_name: "",
      email: "",
      is_active: true,
      user_type: "employee",
      role: "",
      password: "",
    });
  }

  static provideRoleOptions() {
    // only provide employee roles
    return Object.values(Roles).filter((role) => role !== Roles.GUEST && role !== Roles.CUSTOMER);
  }

  static provideEmptyVoucher() {
    return {
      code: "",
      amount: "0",
      owner_id: "",
      owner_email: "",
    };
  }

  static getUserIdByEmail(email, users) {
    
    // when voucher gets resettet after submitting, email is empty, but this method is called since email is watched
    if (!email) {
      return "";
    }

    const user = users.find((user) => user.email === email);
    return user.id;
  }

  static async tryPostNewUser(user, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_USER);
    const validationError = FormValidatorService.validateForm(user.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    const data = {
      full_name: user.value.full_name,
      email: user.value.email,
      is_active: user.value.is_active,
      user_type: user.value.user_type,
      role: user.value.role,
      password: user.value.password,
    };

    return axios
      .post("/api/v1/users/", data, AuthService.getAuthorizedConfig(authStore))
      .then(() => {
        user.value = AdminService.provideEmptyUser();
        ToasterService.createToasterPopUp("success", "User erfolgreich hinzugefügt");
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Etwas ist schief gelaufen.");
      });
  }

  static async getAllUsers(authStore) {
    return axios
      .get("/api/v1/users/", AuthService.getAuthorizedConfig(authStore))
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Fehler beim Laden der User.");
      });
  }

  static async deleteUser(userId, authStore) {
    return axios
      .delete(`/api/v1/users/${userId}`, AuthService.getAuthorizedConfig(authStore))
      .then(() => {
        ToasterService.createToasterPopUp("success", "User erfolgreich gelöscht");
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Fehler beim Löschen des Users.");
      });
  }

  static async tryPostNewVoucher(voucher, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_VOUCHER);
    const validationError = FormValidatorService.validateForm(voucher.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    await AdminService.postVoucherData(voucher, authStore);
    
  }

  static async postVoucherData(voucher, authStore) {
    const data = {
      //code: voucher.value.code, TODO: wait until code as a property of voucher in the data model
      amount: voucher.value.amount,
      owner_id: voucher.value.owner_id,
    };

    return axios
      .post("/api/v1/vouchers/", data, AuthService.getAuthorizedConfig(authStore))
      .then(() => {
        voucher.value = AdminService.provideEmptyVoucher();
        ToasterService.createToasterPopUp("success", "Gutschein erfolgreich hinzugefügt");
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Etwas ist schief gelaufen.");
      });
  }
}

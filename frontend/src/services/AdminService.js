import { Roles } from "@/constants/Roles";
import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";

export default class AdminService {
  static provideEmptyUser() {
    return {
      full_name: "",
      email: "",
      is_active: true,
      user_type: "employee",
      role: "",
      password: "",
    };
  }

  static provideRoleOptions() {
    // only provide employee roles
    return Object.values(Roles).filter((role) => role !== Roles.GUEST && role !== Roles.CUSTOMER);
  }

  static provideEmptyVoucher() {
    return {
      code_name: "",
      amount: "0",
      owner_id: "",
      owner_email: "",
    };
  }

  static provideVoucherOwnerEmailOptions(users) {
    // this function is already executed when users are not loaded yet
    if (users.length === 0) {
      return [];
    }

    const possibleOwners = users.filter((user) => user.role === Roles.CUSTOMER);

    if (possibleOwners.length === 0) {
      ToasterService.createToasterPopUp("error", "Keine Kunden im System.");
      return [];
    }

    return possibleOwners.map((user) => user.email);
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

    const result = await AdminService.postNewUser(user, authStore);

    if (result.success) {
      ToasterService.createToasterPopUp("success", "User erfolgreich hinzugefügt.");
      user.value = AdminService.provideEmptyUser();
    } else {
      ToasterService.createToasterPopUp("error", "Fehler beim Hinzufügen des Users.");
    }
  }

  static async postNewUser(user, authStore) {
    const data = {
      full_name: user.value.full_name,
      email: user.value.email,
      is_active: user.value.is_active,
      user_type: user.value.user_type,
      role: user.value.role,
      password: user.value.password,
    };

    console.log(data);

    return await axios
      .post("/api/v1/users/", data, {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }

  static async tryGetAllUsers(authStore) {
    const result = await AdminService.getAllUsers(authStore);

    if (result.success) {
      return result.data;
    } else {
      ToasterService.createToasterPopUp("error", "Fehler beim Laden der User.");
    }
  }

  static async getAllUsers(authStore) {
    return axios
      .get("/api/v1/users/", {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then((response) => {
        return { success: true, data: response.data.data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }

  static async tryDeleteUser(user, authStore) {
    if (user.id === authStore.userId) {
      ToasterService.createToasterPopUp("error", "Du kannst dich nicht selbst löschen.");
      return;
    }

    const result = await AdminService.deleteUser(user, authStore);

    if (result.success) {
      ToasterService.createToasterPopUp("success", "User erfolgreich gelöscht.");
      window.location.reload(); // TODO: more elegant solution
    } else {
      ToasterService.createToasterPopUp("error", "Fehler beim Löschen des Users.");
    }
  }

  static async deleteUser(user, authStore) {
    return await axios
      .delete(`/api/v1/users/${user.id}`, {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }

  static async tryPostNewVoucher(voucher, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_VOUCHER);
    const validationError = FormValidatorService.validateForm(voucher.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    const result = await AdminService.postVoucherData(voucher, authStore);

    if (result.success) {
      ToasterService.createToasterPopUp("success", "Gutschein erfolgreich hinzugefügt.");
      voucher.value = AdminService.provideEmptyVoucher();
    } else {
      ToasterService.createToasterPopUp("error", "Fehler beim Hinzufügen des Gutscheins.");
    }
  }

  static async postVoucherData(voucher, authStore) {
    const data = {
      title: voucher.value.code_name,
      amount: voucher.value.amount,
      owner_id: voucher.value.owner_id,
    };

    return axios
      .post("/api/v1/vouchers/", data, {
        headers: AuthService.getAuthorizedHeaders(authStore),
      })
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
}

import { ref } from "vue";
import { Roles } from "@/constants/Roles";
import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";

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

  static async postNewUser(user, authStore) {
    const data = {
      full_name: user.value.full_name,
      email: user.value.email,
      is_active: user.value.is_active,
      user_type: user.value.user_type,
      role: user.value.role,
      password: user.value.password,
    };

    return axios
      .post("/api/v1/users/", data, AuthService.getConfig(authStore))
      .then(() => {
        user.value = AdminService.provideEmptyUser();
        ToasterService.createToasterPopUp(
          "success",
          "User erfolgreich hinzugefügt",
        );
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp(
          "error",
          "Etwas ist schief gelaufen.",
        );
      });
  }

  static async getAllUsers(authStore) {
    return axios
      .get("/api/v1/users/", AuthService.getConfig(authStore))
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp(
          "error",
          "Fehler beim Laden der User.",
        );
      });
  }

  static async deleteUser(userId, authStore) {
    return axios
      .delete(`/api/v1/users/${userId}`, AuthService.getConfig(authStore))
      .then(() => {
        ToasterService.createToasterPopUp(
          "success",
          "User erfolgreich gelöscht",
        );
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp(
          "error",
          "Fehler beim Löschen des Users.",
        );
      });
  }
}

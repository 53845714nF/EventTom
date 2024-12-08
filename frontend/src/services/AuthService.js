import axios from "axios";
import ToasterService from "./ToasterService";
import router from "@/router";
import { Roles } from "@/constants/Roles";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";

export default class AuthService {
  // provides an empty user object to bind to the AuthForm
  static provideEmptySignUpUser() {
    return {
      full_name: "",
      email: "",
      password: "",
      password_repeat: "",
    };
  }

  static provideEmptyLoginUser() {
    return {
      email: "",
      password: "",
    };
  }

  // sends a POST request to the backend with the user data
  // Either logs in user (signUp = false) or signs up user (signUp = true)
  static trySignUpUser(user, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.SIGNUP);
    const validationError = FormValidatorService.validateForm(user.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    // check for matching passwords separately
    if (user.value.password !== user.value.password_repeat) {
      ToasterService.createToasterPopUp("error", "Passwörter stimmen nicht überein.");
      return;
    }

    ToasterService.createToasterPopUp("error", "Sign up not implemented yet.");
    console.log(authStore);
  }

  // sends a POST request to the backend to log in the user
  // if successful, saves the access token to the local storage and redirects to the provided redirectPath
  static async tryLoginUser(user, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.LOGIN);
    const validationError = FormValidatorService.validateForm(user.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("username", user.value.email); // beachte die URL-kodierte Form
    data.append("password", user.value.password);
    data.append("scope", "");
    data.append("client_id", "string");
    data.append("client_secret", "string");

    // send api request of type application/x-www-form-urlencoded
    await axios
      .post("/api/v1/login/access-token", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        authStore.setAccessToken(response.data.access_token);
        authStore.setRole(import.meta.env.VITE_INITIAL_ROLE);

        // set the redirect path to the first item in the navItems array
        const redirectPath = authStore.navItems.items[0].path;
        router.push(redirectPath);

        ToasterService.createToasterPopUp("success", "Login erfolgreich!");
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Falsche Email oder Passwort.");
      });
  }

  // logs out the user by removing the access token and role from the local storage
  // no redirect is needed, because it is implemented by giving path to the logout button in the header
  static logoutUser(authStore) {
    authStore.removeAccessToken();
    authStore.setRole(Roles.GUEST);
    ToasterService.createToasterPopUp("success", "Logout erfolgreich!");
  }

  static async testAccessToken(store) {
    const data = {};

    await axios
      .post("/api/v1/login/test-token", data, AuthService.getConfig(store))
      .then((response) => {
        console.log(response);
        ToasterService.createToasterPopUp("success", `Token valid. Role: ${store.role}`);
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Token invalid.");
      });
  }

  static getConfig(authStore) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    };
    return config;
  }
}

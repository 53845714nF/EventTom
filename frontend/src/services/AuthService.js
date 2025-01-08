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

  // ### Handling Login and Sign Up ###

  static async trySignUpUser(user, authStore) {
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

    try {
      const response = await AuthService.postSignUpData(user);

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Sign up failed.");
        return;
      }
    } catch (error) {
      console.error(error);
      ToasterService.createDefaultErrorPopUp();
      return;
    }

    // log in user after successful sign up
    await AuthService.tryLoginUser(user, authStore);
  }

  static async tryLoginUser(user, authStore) {
    const validationRules = FormValidatorService.getValidationRules(FormTypes.LOGIN);
    const validationError = FormValidatorService.validateForm(user.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    try {
      const response = await AuthService.postLoginData(user);

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Falsche Email oder Passwort.");
        return;
      }

      // set accessToken first since it is needed to fetch the user info
      authStore.setAccessToken(response.access_token);

      const userInfo = await AuthService.getUserMe(authStore);

      authStore.setRole(userInfo.role);
      authStore.setId(userInfo.id);
      authStore.setBalance(userInfo.balance);

      // set the redirect path to the first item in the navItems array
      const redirectPath = authStore.navItems.items[0].path;
      router.push(redirectPath);
    } catch (error) {
      console.error(error);
      ToasterService.createDefaultErrorPopUp();
      return;
    }
  }

  // ### API Calls ###

  static async postLoginData(user) {
    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("username", user.value.email); // beachte die URL-kodierte Form
    data.append("password", user.value.password);
    data.append("scope", "");
    data.append("client_id", "string");
    data.append("client_secret", "string");

    // send api request of type application/x-www-form-urlencoded
    return await axios
      .post("/api/v1/login/access-token", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        return { success: true, access_token: response.data.access_token };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }

  static async postSignUpData(user) {
    const data = {
      full_name: user.value.full_name,
      email: user.value.email,
      password: user.value.password,
    };

    // send api request of type application/x-www-form-urlencoded
    return await axios
      .post("/api/v1/users/signup", data, AuthService.getBasicConfig())
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }

  static async getUserMe(store) {
    return await axios
      .get("/api/v1/users/me", AuthService.getAuthorizedConfig(store))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Could not fetch current user.");
      });
  }

  static async testAccessToken(store) {
    await axios
      .post("/api/v1/login/test-token", {}, AuthService.getAuthorizedConfig(store))
      .then(() => {
        ToasterService.createToasterPopUp("success", `Token valid. Role: ${store.role}`);
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Token invalid.");
      });
  }

  // ### Utils ###

  // logs out the user by removing the access token and role from the local storage
  // no redirect is needed, because it is implemented by giving path to the logout button in the header
  static logoutUser(authStore) {
    authStore.removeAccessToken();
    authStore.setRole(Roles.GUEST);
    authStore.removeId();
    authStore.removeBalance();
    ToasterService.createToasterPopUp("success", "Logout erfolgreich!");
  }

  static getAuthorizedConfig(authStore) {
    return {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    };
  }

  static getBasicConfig() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    return config;
  }

  static getAuthorizedHeaders(authStore) {
    return {
      Accept: "application/json",
      Authorization: `Bearer ${authStore.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  static getBasicHeaders() {
    return {
      Accept: "application/json",
    };
  }
}

import axios from "axios";
import { ref } from "vue";
import ToasterService from "./ToasterService";
import router from "@/router";
import { Roles } from "@/constants/Roles";
import { AuthFormText } from "@/constants/AuthFormText";
import DevVariables from "@/constants/DevVariables";

export default class AuthService {
  // provides the text values for buttons in the AuthForm depending on whether the user is signing up or logging in
  static provideDynamicAuthText(isUserSigningUp) {
    if (isUserSigningUp) {
      return AuthFormText.SIGN_UP;
    } else {
      return AuthFormText.SIGN_IN;
    }
  }

  // provides an empty user object to bind to the AuthForm
  static provideEmptyUser() {
    return ref({
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    });
  }

  // checks if input values from AuthForm are correct
  // logic depends on if user is signing up (signUp = true) or logging in (signUp = false)
  static _checkIfInputValuesCorrect(user, isUserSigningUp) {
    if (!(user.value.username && user.value.password)) {
      return { isValid: false, message: "Keine leeren Felder erlaubt." };
    }

    if (isUserSigningUp) {
      if (!(user.value.password === user.value.passwordRepeat)) {
        return {
          isValid: false,
          message: "Passwörter stimmen nicht überein.",
        };
      }

      if (!(user.value.password.length >= 8)) {
        return {
          isValid: false,
          message: "Passwort zu kurz. Mindestens 8 Zeichen.",
        };
      }

      if (!user.value.email) {
        return {
          isValid: false,
          message: "Bitte geben Sie eine gültige E-Mail Adresse an.",
        };
      }
    }

    return { isValid: true, message: "" };
  }

  // sends a POST request to the backend with the user data
  // Either logs in user (signUp = false) or signs up user (signUp = true)
  static postUser(user, isUserSigningUp, redirectPath, store) {
    const validationResult = this._checkIfInputValuesCorrect(
      user,
      isUserSigningUp,
    );

    if (!validationResult.isValid) {
      ToasterService.createToasterPopUp("error", validationResult.message);
      return;
    }

    if (isUserSigningUp) {
      this._postSignupData(user, redirectPath);
    } else {
      this._postLoginData(user, redirectPath, store);
    }
  }

  // sends a POST request to the backend to log in the user
  // if successful, saves the access token to the local storage and redirects to the provided redirectPath
  static async _postLoginData(user, redirectPath, authStore) {
    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("username", user.value.username); // beachte die URL-kodierte Form
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
        authStore.setRole(DevVariables.INITIAL_ROLE);
        router.push(redirectPath);
        ToasterService.createToasterPopUp("success", "Login erfolgreich!");
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp(
          "error",
          "Falscher Username oder Passwort.",
        );
      });
  }

  static _postSignupData() {
    console.log("not implemented yet");
    ToasterService.createToasterPopUp("error", "Sign up not implemented yet.");
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

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${store.accessToken}`,
      },
    };

    await axios
      .post("/api/v1/login/test-token", data, config)
      .then((response) => {
        console.log(response);
        ToasterService.createToasterPopUp(
          "success",
          `Token valid. Role: ${store.role}`,
        );
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Token invalid.");
      });
  }

  static getConfig(authStore) {
    return {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${authStore.accessToken}`,
      },
    };
  }
}

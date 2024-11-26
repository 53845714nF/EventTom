import { ref } from "vue";
import { vi } from "vitest";
import { Roles } from "@/constants/Roles";
import { NavItems } from "@/constants/NavItems";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { useAuthStore } from "@/stores/AuthStore";
// Different Users for testing

export function createCorrectUserSignUp() {
  return ref({
    username: "testName",
    email: "test@mail.com",
    password: "testPassword",
    passwordRepeat: "testPassword",
  });
}

export function createUserWithPasswordsDontMatch() {
  return ref({
    username: "testName",
    email: "test@mail.com",
    password: "testPassword1",
    passwordRepeat: "testPassword2",
  });
}

export function createUserWithPasswordTooShort() {
  return ref({
    username: "testName",
    email: "test@mail.com",
    password: "shortPw",
    passwordRepeat: "shortPw",
  });
}

export function createCorrectUserSignIn() {
  return ref({
    username: "testName",
    password: "testPassword",
  });
}

export function createEmptyUser() {
  return ref({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
}

// Different AuthStores for testing

export function createAuthStoreLoggedOut() {
  return {
    role: Roles.GUEST,
    accessToken: "",
    userAuthenticated: false,
    navItems: NavItems.GUEST,
    setAccessToken: vi.fn(function (newToken) {
      this.accessToken = newToken;
    }),
    removeAccessToken: vi.fn(function () {
      this.setAccessToken("");
    }),
    setRole: vi.fn(function (newRole) {
      this.role = newRole;
    }),
  };
}

export function createAuthStoreLoggedInUser() {
  return {
    role: Roles.CUSTOMER,
    accessToken: "validToken",
    userAuthenticated: true,
    navItems: NavItems.CUSTOMER,
    setAccessToken: vi.fn(function (newToken) {
      this.accessToken = newToken;
    }),
    removeAccessToken: vi.fn(function () {
      this.setAccessToken("");
    }),
    setRole: vi.fn(function (newRole) {
      this.role = newRole;
    }),
  };
}

export function setLocalStorageItemsAndCreateAuthStore(role, token) {
  localStorage.setItem(LocalStorageKeys.USER_ROLE, role);
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
  return useAuthStore();
}

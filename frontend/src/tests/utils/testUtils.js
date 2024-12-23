import { ref } from "vue";
import { vi } from "vitest";
import { Roles } from "@/constants/Roles";
import { NavItems } from "@/constants/NavItems";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { useAuthStore } from "@/stores/AuthStore";
// Different Users for testing

export function createCorrectUserLogin() {
  return ref({
    email: "test@mail.com",
    password: "testPassword",
  });
}

export function createCorrectUserSignUp() {
  return ref({
    full_name: "testName",
    email: "test@mail.com",
    password: "testPassword",
    password_repeat: "testPassword",
  });
}

export function createUserWithPasswordsDontMatch() {
  return ref({
    full_name: "testName",
    email: "test@mail.com",
    password: "testPassword1",
    password_repeat: "testPassword2",
  });
}

export function createUserWithPasswordTooShort() {
  return ref({
    full_name: "testName",
    email: "test@mail.com",
    password: "shortPw",
    password_repeat: "shortPw",
  });
}

export function createEmptySignUpUser() {
  return {
    full_name: "",
    email: "",
    password: "",
    password_repeat: "",
  };
}

export function createEmptyLoginUser() {
  return {
    email: "",
    password: "",
  };
}

// Different AuthStores for testing

export function createAuthStoreLoggedOut() {
  return {
    role: Roles.GUEST,
    accessToken: "",
    id: "",
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
    setId: vi.fn(function (newId) {
      this.id = newId;
    }),
    removeId: vi.fn(function () {
      this.setId("");
    }),
  };
}

export function createAuthStoreLoggedInUser() {
  return {
    role: Roles.CUSTOMER,
    id: "1234-5678-1357",
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
    setId: vi.fn(function (newId) {
      this.id = newId;
    }),
    removeId: vi.fn(function () {
      this.setId("");
    }),
  };
}

// LocalStorage functions for testing

export function setLocalStorageItemsAndCreateAuthStore(role, token) {
  localStorage.setItem(LocalStorageKeys.USER_ROLE, role);
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
  return useAuthStore();
}

// Test Event Objects

export function getTestEvent() {
  return {
    title: "Test Event",
    description: "Test Description",
    tickets: 100,
    tickets_sold: 80,
  };
}

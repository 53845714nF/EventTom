import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { Roles } from "@/constants/Roles";
import { NavItems } from "@/constants/NavItems";

export const useAuthStore = defineStore("role", () => {
  const role = ref(localStorage.getItem(LocalStorageKeys.USER_ROLE) || Roles.GUEST);
  const accessToken = ref(localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || "");

  const userAuthenticated = computed(() => !!accessToken.value);

  const navItems = computed(() => {
    switch (role.value.toLowerCase()) {
      case Roles.CUSTOMER:
        return NavItems.CUSTOMER;
      case Roles.EVENT_MANAGER:
        return NavItems.EVENT_MANAGER;
      case Roles.EVENT_CREATOR:
        return NavItems.EVENT_CREATOR;
      case Roles.ADMIN:
        return NavItems.ADMIN;
      default:
        return NavItems.GUEST;
    }
  });

  function setRole(newRole) {
    localStorage.setItem(LocalStorageKeys.USER_ROLE, newRole);
    role.value = newRole;
  }

  function setAccessToken(newToken) {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newToken);
    accessToken.value = newToken;
  }

  function removeAccessToken() {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, "");
    accessToken.value = "";
  }

  // you have to return every state property in order for pinia to work properly
  return {
    role,
    accessToken,
    userAuthenticated,
    navItems,
    setAccessToken,
    removeAccessToken,
    setRole,
  };
});

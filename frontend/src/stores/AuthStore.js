import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";

export const useAuthStore = defineStore('role', () => {
    const role = ref(localStorage.getItem(LocalStorageKeys.USER_ROLE) || 'guest');
    const accessToken = ref(localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || '');

    const userAuthenticated = computed(() => !!accessToken.value)
    
    function setRole(newRole) {
        localStorage.setItem(LocalStorageKeys.USER_ROLE, newRole);
        role.value = newRole;
    }

    function setAccessToken(newToken) {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newToken);
        accessToken.value = newToken;
    }

    function removeAccessToken () {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, "");
        accessToken.value = "";
    }

    // you have to return every state property in order for pinia to work properly
    return {
        role,
        accessToken,
        userAuthenticated,
        setAccessToken,
        removeAccessToken,
        setRole
    }
})
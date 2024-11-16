import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useRoleStore = defineStore('role', () => {
    const role = ref(localStorage.getItem("role") || 'guest');
    const accessToken = ref(localStorage.getItem("accessToken"))

    const userAuthenticated = computed(() => !!accessToken.value)
    
    function setRole(newRole) {
        localStorage.setItem("role", newRole);
        role.value = newRole;
    }

    function setAccessToken(newToken) {
        localStorage.setItem("accessToken", newToken);
        accessToken.value = newToken;
    }

    function removeAccessToken () {
        localStorage.setItem("accessToken", "");
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
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import { RouterLink } from "vue-router";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";

const authStore = useAuthStore();

const handlePrimaryButtonClick = () => {
  if (authStore.userAuthenticated) {
    AuthService.logoutUser(authStore);
  }
};
</script>

<template>
  <header>
    <RouterLink class="nav-item logo-text" to="/">EvenTom</RouterLink>
    <nav class="nav-item-container">
      <RouterLink
        v-for="(item, index) in authStore.navItems.items"
        :key="index"
        :to="item.path"
        class="p-large nav-item"
        active-class="nav-item-active"
        >{{ item.title }}</RouterLink
      >
    </nav>
    <PrimaryButton
      @click="handlePrimaryButtonClick"
      :text="authStore.navItems.button.title"
      :to="authStore.navItems.button.path"
      :type="PrimaryButtonTypes.GREEN"
      class="nav-item"
    />
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 30px 0;
}

.nav-item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-item {
  margin: 0 20px;
  cursor: pointer;
}

.nav-item:hover {
  color: var(--color-text-green);
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
}
</style>

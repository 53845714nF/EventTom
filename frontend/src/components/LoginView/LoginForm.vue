<script setup>
import { ref } from "vue";
import FormInput from "../Basic/FormInput.vue";
import PrimaryButton from "../Basic/PrimaryButton.vue";
import SecondaryButton from "../Basic/SecondaryButton.vue";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { PrimaryButtonTypes, SecondaryButtonTypes } from "@/constants/ButtonTypes";

const user = ref(AuthService.provideEmptyLoginUser());
const authStore = useAuthStore();

const tryLoginUser = () => AuthService.tryLoginUser(user, authStore);
</script>

<template>
  <div class="form-background">
    <h3 class="heading-margin">Login</h3>
    <div class="form-container">
      <FormInput v-model="user.email" title="Name" placeholder="Email" type="text" />
      <FormInput v-model="user.password" title="Passwort" placeholder="Passwort" type="password" />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="tryLoginUser" text="Login" :type="PrimaryButtonTypes.GREEN" />
      <SecondaryButton to="/signup" text="Ich habe noch kein Konto" :type="SecondaryButtonTypes.BLACK" />
    </div>
  </div>
</template>

<style scoped>
.form-background {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--color-auth);
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

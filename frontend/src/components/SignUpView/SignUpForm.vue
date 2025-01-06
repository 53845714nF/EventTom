<script setup>
import { ref } from "vue";
import FormInput from "../Basic/FormInput.vue";
import PrimaryButton from "../Basic/PrimaryButton.vue";
import SecondaryButton from "../Basic/SecondaryButton.vue";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { PrimaryButtonTypes, SecondaryButtonTypes } from "@/constants/ButtonTypes";

const user = ref(AuthService.provideEmptySignUpUser());
const authStore = useAuthStore();

const trySignUpUser = async () => await AuthService.trySignUpUser(user, authStore);
</script>

<template>
  <div class="form-background">
    <h3 class="heading-margin">Willkommen bei EvenTom!</h3>
    <div class="form-container">
      <FormInput v-model="user.full_name" title="Name" placeholder="Nutzername" type="text" maxlength="255" />
      <FormInput v-model="user.email" title="E-Mail" placeholder="E-Mail" type="text" maxlength="255" />
      <FormInput v-model="user.password" title="Passwort" placeholder="Passwort" type="password" maxlength="40" />
      <FormInput
        v-model="user.password_repeat"
        title="Passwort wiederholen"
        placeholder="Passwort"
        type="password"
        maxlength="40"
      />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="trySignUpUser" text="Registrieren" :type="PrimaryButtonTypes.GREEN" />
      <SecondaryButton to="/login" text="Ich habe schon ein Konto" :type="SecondaryButtonTypes.BLACK" />
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

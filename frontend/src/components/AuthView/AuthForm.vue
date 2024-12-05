<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import FormInput from "../Basic/FormInput.vue";
import PrimaryButton from "../Basic/PrimaryButton.vue";
import SecondaryButton from "../Basic/SecondaryButton.vue";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import {
  PrimaryButtonTypes,
  SecondaryButtonTypes,
} from "@/constants/ButtonTypes";

// use the route to get the type parameter
const route = useRoute();
const type = ref(route.params.type);
const user = AuthService.provideEmptyUser();
const authStore = useAuthStore();

// watch for changes in route.params.type
watch(
  () => route.params.type,
  (newType) => {
    type.value = newType;
  },
);

// computed value für `signUp` und `secondaryButtonRedirect`
// computed is used to derive a value from other reactive values
// in this case, `type` is a reactive value and `signUp` and `secondaryButtonRedirect` are derived from it
// `signUp` and `secondaryButtonRedirect` are reactive values as well
const signUp = computed(() => type.value === "signup");
const secondaryButtonRedirect = computed(() =>
  signUp.value ? "signin" : "signup",
);

// get text for title, PrimaryButton, SecondaryButton based on whether the user is logged in or not
const dynamicAuthText = computed(() =>
  AuthService.provideDynamicAuthText(signUp.value),
);

const postUser = () => AuthService.postUser(user, signUp.value, authStore);
</script>

<template>
  <div class="form-background">
    <h3 class="heading-margin">{{ dynamicAuthText.title }}</h3>
    <div class="form-container">
      <FormInput
        v-model="user.username"
        title="Name"
        placeholder="Nutzername"
        type="text"
      />
      <FormInput
        v-if="signUp"
        v-model="user.email"
        title="E-Mail"
        placeholder="E-Mail"
        type="text"
      />
      <FormInput
        v-model="user.password"
        title="Passwort"
        placeholder="Passwort"
        type="password"
      />
      <FormInput
        v-if="signUp"
        v-model="user.passwordRepeat"
        title="Passwort wiederholen"
        placeholder="Passwort"
        type="password"
      />
    </div>
    <div class="button-container">
      <PrimaryButton
        :onClick="postUser"
        :text="dynamicAuthText.primaryButtonText"
        :type="PrimaryButtonTypes.GREEN"
      />
      <SecondaryButton
        :to="`/auth/${secondaryButtonRedirect}`"
        :text="dynamicAuthText.secondaryButtonText"
        :type="SecondaryButtonTypes.BLACK"
      />
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
  align-items: flex-start;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

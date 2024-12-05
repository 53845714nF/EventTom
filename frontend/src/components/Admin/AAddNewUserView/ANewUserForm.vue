<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import AdminService from "@/services/AdminService";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();
const user = AdminService.provideEmptyUser();
const roleOptions = AdminService.provideRoleOptions();
const postUser = () => AdminService.postNewUser(user, authStore);
</script>

<template>
  <div class="form-background">
    <div class="form-container">
      <FormInput
        v-model="user.full_name"
        title="Name"
        placeholder="Nutzername"
        type="text"
      />
      <FormInput
        v-model="user.email"
        title="E-Mail"
        placeholder="E-Mail"
        type="text"
      />
      <FormInput
        v-model="user.password"
        title="Passwort"
        placeholder="Passwort"
        type="text"
      />
      <FormInput
        v-model="user.role"
        title="Rolle"
        placeholder="Rolle"
        type="select"
        :options="roleOptions"
      />
    </div>
    <div class="button-container">
      <PrimaryButton
        :onClick="postUser"
        text="User hinzufügen"
        :type="PrimaryButtonTypes.GREEN"
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

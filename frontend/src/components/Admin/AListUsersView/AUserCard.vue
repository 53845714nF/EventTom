<script setup>
import AdminService from "@/services/AdminService";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const deleteUser = async () => await AdminService.tryDeleteUser(props.user, authStore);
</script>

<template>
  <div class="card-body">
    <div>
      <div class="heading-role-container">
        <h4>{{ user.full_name ? user.full_name : "AdminAccount" }}</h4>
        <p class="p-bold small-margin">{{ user.role }}</p>
      </div>
      <div @click="deleteUser" class="icon-button delete-user-button">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
    <p class="small-margin">{{ props.user.email }}</p>
  </div>
</template>

<style scoped>
.card-body {
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: var(--cp-pastel-green);
}

.card-body > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body h4 {
  margin-right: 15px;
}

.heading-role-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.delete-user-button {
  background-color: var(--cp-white);
}

.delete-user-button:hover {
  background-color: var(--cp-light-grey);
}
</style>

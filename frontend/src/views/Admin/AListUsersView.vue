<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import AdminService from "@/services/AdminService";
import AUserCard from "@/components/Admin/AListUsersView/AUserCard.vue";
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

const users = ref([]);

onBeforeMount(async () => {
  await AdminService.getAllUsers(authStore).then((data) => {
    users.value = data;
  });
});
</script>

<template>
  <PageTitleContainer title="Benutzer Liste" />
  <div class="content-container">
    <AUserCard v-for="user in users" :key="user" :index="user" :user="user" />
  </div>
</template>

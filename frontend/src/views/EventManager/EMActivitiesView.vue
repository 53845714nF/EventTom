<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EMActivityCard from "@/components/EventManager/EMActivitiesView/EMActivityCard.vue";
import EventManagerService from "@/services/EventManagerService";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, onBeforeMount } from "vue";

const activities = ref([]);
const authStore = useAuthStore(); // Initialize auth store
const limit = 50;

onBeforeMount(async () => {
  await EventManagerService.tryGetRecentActivties(limit, authStore).then((result) => {
    activities.value = result; 
  });
});
</script>

<template>
  <PageTitleContainer title="Aktivitäten" />
  <div class="content-container">
    <EMActivityCard v-for="activity in activities" :key="activity.timestamp" :activity="activity" />
  </div>
</template>

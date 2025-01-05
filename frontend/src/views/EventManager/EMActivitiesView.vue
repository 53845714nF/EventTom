<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EMActivityCard from "@/components/EventManager/EMActivitiesView/EMActivityCard.vue";
import EventManagerService from "@/services/EventManagerService";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, onBeforeMount, onUnmounted } from "vue";
import { useWebSocketStore } from "@/stores/webSocketStore";
import ToasterService from "@/services/ToasterService";

const activities = ref([]);
const authStore = useAuthStore(); // Initialize auth store
const limit = 50;
const websocketStore = useWebSocketStore();

onBeforeMount(async () => {
  websocketStore.addListener((data) => {
    if (data.type === "ticket_purchase") {
      activities.value.unshift(data); // Add new activity to the beginning of the list
      ToasterService.createToasterPopUp(
        "info",
        `Ticketkauf: ${data.user.email} hat ${data.quantity} Tickets für ${data.event.title} gekauft.`,
      );
    }
  });

  await EventManagerService.tryGetRecentActivties(limit, authStore).then((result) => {
    activities.value = result;
  });
});

onUnmounted(() => {
  websocketStore.removeAllListeners();
});
</script>

<template>
  <PageTitleContainer title="Aktivitäten" />
  <div class="content-container">
    <EMActivityCard v-for="activity in activities" :key="activity.timestamp" :activity="activity" />
  </div>
</template>

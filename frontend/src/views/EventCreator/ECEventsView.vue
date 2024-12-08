<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import ECEventCard from "@/components/EventCreator/ECEventsView/ECEventCard.vue";
import EventCreatorService from "@/services/EventCreatorService";
import { useAuthStore } from "@/stores/AuthStore";
import { onBeforeMount, ref } from "vue";

const authStore = useAuthStore();
const events = ref([]);

onBeforeMount(async () => {
  EventCreatorService.getEventsForEventCreator("", authStore).then((options) => {
    events.value = options;
  });
});
</script>

<template>
  <PageTitleContainer title="Deine Events" />
  <div class="content-container">
    <ECEventCard v-for="event in events" :key="event.title" :event="event"></ECEventCard>
  </div>
</template>

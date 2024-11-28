<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EMEventCard from "@/components/EventManager/EMEventsView/EMEventCard.vue";
import EventManagerService from "@/services/EventManagerService";
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();
const eventManagerId = 1;
const events = ref([]);

onBeforeMount(async () => {
  await EventManagerService.getEventsForEventManager(
    eventManagerId,
    authStore,
  ).then((data) => {
    events.value = data;
  });
});
</script>

<template>
  <PageTitleContainer title="Anstehende Events" />
  <div class="content-container">
    <EMEventCard
      v-for="event in events"
      :key="event.title"
      :event="event"
    ></EMEventCard>
  </div>
</template>

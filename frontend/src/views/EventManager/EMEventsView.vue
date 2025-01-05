<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EMEventCard from "@/components/EventManager/EMEventsView/EMEventCard.vue";
import EventManagerService from "@/services/EventManagerService";
import { onBeforeMount, onUnmounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useWebSocketStore } from "@/stores/webSocketStore";
import ToasterService from "@/services/ToasterService";

const authStore = useAuthStore();
const eventManagerId = authStore.userId;
const events = ref([]);
const websocketStore = useWebSocketStore();

onBeforeMount(async () => {

  websocketStore.addListener((data) => {
    if (data.type === "event_create") {
      if (data.event.manager_id === eventManagerId) {
        events.value.push(data.event);
      }
    } else if (data.type === "event_delete") {
      events.value = events.value.filter((event) => event.id !== data.event.id);
    } else if (data.type === "ticket_purchase") {
      console.log(data.event);
      let event = events.value.find((event) => event.id === data.event.id);
      event.sold_tickets += Number(data.quantity);
      ToasterService.createToasterPopUp("info", `${data.user.email} hat ${data.quantity} Tickets für ${data.event.title} gekauft.`);
    }
  });

  await EventManagerService.tryGetEventsForEventManager(eventManagerId, authStore).then((response) => {
    events.value = response;
  });
});

onUnmounted(() => {
  websocketStore.removeAllListeners();
});
</script>

<template>
  <PageTitleContainer title="Anstehende Events" />
  <div class="content-container">
    <EMEventCard v-for="event in events" :key="event.title" :event="event"></EMEventCard>
  </div>
</template>

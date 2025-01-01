<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CustomerService from "@/services/CustomerService";
import { onBeforeUnmount, onMounted, ref } from "vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";
import { useWebSocketStore } from "@/stores/websocketStore";

const events = ref([]);
const websocketStore = useWebSocketStore();


onMounted(() => {

  websocketStore.webSocketService.addListener((data) => {
    if (data.type === "event_create") {
      events.value.push(data.event);
    } else if (data.type === "event_delete") {
      console.log("event_delete called")
      events.value = events.value.filter(event => event.id !== data.event.id);
    }
  });
  
  // Alle Events initial laden
  CustomerService.tryGetAllEvents().then((result) => {
    events.value = result.data;
  });
});

onBeforeUnmount(() => {
  websocketStore.webSocketService.removeAllListeners();
})
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <CEventCard v-for="event in events" :key="event.title" :event="event"></CEventCard>
  </div>
</template>

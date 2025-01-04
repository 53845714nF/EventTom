<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CustomerService from "@/services/CustomerService";
import { onMounted, onUnmounted, ref } from "vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";
import { useWebSocketStore } from "@/stores/webSocketStore";

const events = ref([]);
const websocketStore = useWebSocketStore();

onMounted(() => {

  websocketStore.addListener((data) => {
    if (data.type === "event_create") {
      events.value.push(data.event);
    } else if (data.type === "event_delete") {
      events.value = events.value.filter((event) => event.id !== data.event.id);
    } else if (data.type === "ticket_purchase") {
      let event = events.value.find((event) => event.id === data.event.id);
      event.sold_tickets += Number(data.quantity);
    }
  });

  // Alle Events initial laden
  CustomerService.tryGetAllEvents().then((result) => {
    events.value = result.data;
  });
});

onUnmounted(() => {
  websocketStore.removeAllListeners();
});
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <CEventCard v-for="event in events" :key="event.id" :event="event"></CEventCard>
  </div>
</template>

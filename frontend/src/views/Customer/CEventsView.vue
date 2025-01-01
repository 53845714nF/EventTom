<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CustomerService from "@/services/CustomerService";
import { onBeforeUnmount, onMounted, ref } from "vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";
import WebSocketService from "@/services/WebSocketService";

const events = ref([]);

onMounted(() => {

  WebSocketService.connect();
  WebSocketService.addListener((data) => {
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
  WebSocketService.close();
  WebSocketService.removeListeners();
})
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <CEventCard v-for="event in events" :key="event.title" :event="event"></CEventCard>
  </div>
</template>

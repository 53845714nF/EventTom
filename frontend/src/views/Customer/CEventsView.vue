<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CustomerService from "@/services/CustomerService";
import { onMounted, onUnmounted, ref } from "vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";
import { useWebSocketStore } from "@/stores/websocketStore";

const events = ref([]);
const websocketStore = useWebSocketStore();

onMounted(() => {
  // socket = new WebSocket("ws://localhost:8000/api/v1/ws");
  // socket.onopen = () => console.log("socket ready");
  // socket.onclose = () => console.log("socket closed.");
  // socket.onmessage = (event) => {
  //   console.log("websocket message received");
  //   const data = JSON.parse(event.data);
  //   console.log(data);
  //   if (data.type === "event_create") {
  //     events.value.push(data.event);
  //   } else if (data.type === "event_delete") {
  //     console.log("event_delete called");
  //     events.value = events.value.filter(event => event.id !== data.event.id);
  //   } else if (data.type === "ticket_purchase") {
  //     console.log("ticket_purchase called");
  //     const event = events.value.find(event => event.id === data.event.id)
  //     event.sold_tickets = data.event.sold_tickets;
  //   }
  // };

  websocketStore.addListener((data) => {
    console.log("websocket message received");
    console.log(data);
    if (data.type === "event_create") {
      events.value.push(data.event);
    } else if (data.type === "event_delete") {
      console.log("event_delete called");
      events.value = events.value.filter((event) => event.id !== data.event.id);
    } else if (data.type === "ticket_purchase") {
      console.log("ticket_purchase called");
      console.log(data);
      let event = events.value.find((event) => event.id === data.event.id);

      event.sold_tickets += Number(data.quantity);
      console.log(events.value);
    }
  });

  // Alle Events initial laden
  CustomerService.tryGetAllEvents().then((result) => {
    events.value = result.data;
  });
});

onUnmounted(() => {
  websocketStore.removeAllListeners();
  //socket.close();
});
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <CEventCard v-for="event in events" :key="event.id" :event="event"></CEventCard>
  </div>
</template>

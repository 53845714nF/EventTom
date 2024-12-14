<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import TicketPurchaseForm from "@/components/Customer/CTicketPurchaseView/TicketPurchaseForm.vue";
import { ref, onMounted } from "vue";

const event = ref({
  id: 1,
  title: "Summer Festival",
  description: "Beschreibung des Events, wow was ein cooles Erlebnis",
  organizer: "Name des Organisators",
  price: 38,
  availableTickets: 69,
});


</script>

<template>
  <PageTitleContainer title="Ticket kaufen" />
  <div class="content-container">
    <TicketPurchaseForm :event="event" />
  </div>
</template>

<style scoped>
 
</style>

<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CTicketPurchaseForm from "@/components/Customer/CTicketPurchaseView/CTicketPurchaseForm.vue";
import { ref } from "vue";

// TODO: the event should not be provided here.
// Instead, you should be able to click on the PrimaryButton in the CEventCard.vue and then navigate to the TicketPurchaseView for the selected event.
// see how to pass the event via router here: https://router.vuejs.org/guide/essentials/passing-props
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
    <CTicketPurchaseForm :event="event" />
  </div>
</template>

<style scoped></style>

<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CTicketPurchaseForm from "@/components/Customer/CTicketPurchaseView/CTicketPurchaseForm.vue";
import { useTicketPurchaseStore } from "@/stores/TicketPurchaseStore";

const ticketPurchaseStore = useTicketPurchaseStore();
const event = ticketPurchaseStore.event;
</script>

<template>
  <PageTitleContainer title="Ticket kaufen" />
  <div class="content-container">
    <CTicketPurchaseForm :event="event" />
  </div>
</template>

<style scoped></style>

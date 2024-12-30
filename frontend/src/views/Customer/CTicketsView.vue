<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, onBeforeMount } from "vue";
import CustomerService from "@/services/CustomerService";
import CTicketCard from "@/components/Customer/CTicketsView/CTicketCard.vue";

const tickets = ref([]);
const authStore = useAuthStore(); // Initialize auth store

onBeforeMount(async () => {
  await CustomerService.tryGetAllTicketsForCustomer(authStore).then((result) => {
    tickets.value = result; // Populate vouchers
  });
});
</script>

<template>
  <PageTitleContainer title="Deine Tickets" />
  <div class="content-container">
    <CTicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
  </div>
</template>

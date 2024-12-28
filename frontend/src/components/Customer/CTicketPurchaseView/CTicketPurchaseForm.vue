<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, computed, watch } from "vue";
import CustomerService from "@/services/CustomerService";
import { useTicketPurchaseStore } from "@/stores/TicketPurchaseStore";

const authStore = useAuthStore();
const ticketPurchaseStore = useTicketPurchaseStore();

const event = ticketPurchaseStore.event;

const ticketPurchaseFormData = ref(CustomerService.provideTicketPurchaseFormData());
</script>

<template>
  <div class="form-background">
    <div class="form-container">
      <FormInput v-model="ticketPurchaseFormData.name" title="Name, Vorname" placeholder="Name, Vorname" type="text" />
      <FormInput v-model="ticketPurchaseFormData.address" title="Straße, Hausnummer" placeholder="Straße, Hausnummer" type="text" />
      <FormInput v-model="ticketPurchaseFormData.zip_code" title="PLZ" placeholder="PLZ" type="text" />
      <FormInput v-model="ticketPurchaseFormData.ticket_count" title="Anzahl Tickets" placeholder="Anzahl Tickets" type="number" />
      <FormInput v-model="ticketPurchaseFormData.voucher_code" title="Gutscheincode" placeholder="Gutscheincode" type="text" />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="tryPostEvent" text="Kaufen" :type="PrimaryButtonTypes.BLACK" />
    </div>
  </div>
</template>

<style scoped>
.form-background {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--color-customer);
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

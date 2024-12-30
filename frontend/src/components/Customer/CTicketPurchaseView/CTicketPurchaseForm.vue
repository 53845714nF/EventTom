<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, computed, onBeforeMount } from "vue";
import CustomerService from "@/services/CustomerService";
import router from "@/router";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

// TODO: better solution for this
// navigate back if no event is provided (once browser is refreshed pinia store is reset)
if (!props.event.title) {
  router.push({ name: "CEvents" });
}

const availableVouchers = ref([]);
const ticketPurchaseFormData = ref(CustomerService.provideTicketPurchaseFormData());
const authStore = useAuthStore();

onBeforeMount(async () => {
  await CustomerService.tryGetAllVouchersForCustomer(authStore).then((result) => {
    availableVouchers.value = result.data;
  });
});

const singleTicketPrice = computed(() => CustomerService.calculateSingleTicketPrice(props.event));
const totalPrice = computed(() =>
  CustomerService.calculateTotalTicketPurchasePrice(
    singleTicketPrice.value,
    ticketPurchaseFormData.value,
    appliedVoucher.value,
  ),
);

const appliedVoucher = computed(() =>
  CustomerService.getAppliedVoucherFromCode(ticketPurchaseFormData.value, availableVouchers),
);

const tryPostTicketPurchaseFormData = async () =>
  await CustomerService.tryPurchaseTicket(ticketPurchaseFormData.value, props.event, appliedVoucher.value, authStore);
</script>

<template>
  <div class="container-background">
    <h3 class="heading-margin">{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <div class="form-container">
      <FormInput v-model="ticketPurchaseFormData.name" title="Name, Vorname" placeholder="Name, Vorname" type="text" />
      <FormInput
        v-model="ticketPurchaseFormData.address"
        title="Straße, Hausnummer"
        placeholder="Straße, Hausnummer"
        type="text"
      />
      <FormInput v-model="ticketPurchaseFormData.zip_code" title="PLZ" placeholder="PLZ" type="text" />
      <FormInput
        v-model="ticketPurchaseFormData.ticket_count"
        title="Anzahl Tickets"
        placeholder="Anzahl Tickets"
        type="number"
      />
      <FormInput
        v-model="ticketPurchaseFormData.voucher_code"
        title="Gutscheincode"
        placeholder="Gutscheincode"
        type="text"
      />
    </div>

    <hr />

    <h4>{{ totalPrice }}€</h4>
    <p class="small-margin">
      {{ ticketPurchaseFormData.ticket_count }}x {{ props.event.title }} Ticket: je
      <span class="p-bold">{{ singleTicketPrice }}€</span>
    </p>
    <p v-if="appliedVoucher" class="small-margin">
      1x Gutschein: <span class="p-bold">{{ appliedVoucher.title }}: -{{ appliedVoucher.amount }}€</span>
    </p>

    <div class="button-container">
      <PrimaryButton :onClick="tryPostTicketPurchaseFormData" text="Kaufen" :type="PrimaryButtonTypes.BLACK" />
    </div>
  </div>
</template>

<style scoped>
.container-background {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--color-customer);
}

.container-background h3 {
  margin-top: 10px;
}

.container-background h4 {
  margin-bottom: 20px;
}

.container-background p:first-of-type {
  margin-bottom: 30px;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}

hr {
  border: none;
  border-top: 1px solid var(--cp-black);
  margin: 40px 0;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

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

// price and balance calculations
const singleTicketPrice = computed(() => CustomerService.calculateSingleTicketPrice(props.event));
const minPrice = computed(() =>
  CustomerService.calculateMinTicketPurchasePrice(props.event, ticketPurchaseFormData.value),
);
const totalCost = computed(() =>
  CustomerService.calculateTotalTicketPurchasePrice(
    singleTicketPrice.value,
    ticketPurchaseFormData.value,
    appliedVoucher.value,
    minPrice.value,
  ),
);
const balanceAfterPurchase = computed(() =>
  CustomerService.calculateBalanceAfterPurchase(authStore.balance, totalCost.value.cost),
);
const balanceAfterPurchaseHighlightClass = computed(() =>
  CustomerService.getBalanceAfterPurchaseHighlightClass(balanceAfterPurchase.value),
);

const appliedVoucher = computed(() =>
  CustomerService.getAppliedVoucherFromCode(ticketPurchaseFormData.value, availableVouchers),
);

const tryPostTicketPurchaseFormData = async () =>
  await CustomerService.tryPurchaseTicket(
    ticketPurchaseFormData.value,
    balanceAfterPurchase.value,
    props.event,
    appliedVoucher.value,
    authStore,
  );
</script>

<template>
  <div class="container-background">
    <h3 class="heading-margin">{{ event.title }}</h3>
    <p class="blocktext">{{ event.description }}</p>
    <div class="form-container">
      <FormInput
        v-model="ticketPurchaseFormData.name"
        title="Name, Vorname"
        placeholder="Name, Vorname"
        type="text"
        maxlength="255"
      />
      <FormInput
        v-model="ticketPurchaseFormData.address"
        title="Straße, Hausnummer"
        placeholder="Straße, Hausnummer"
        type="text"
        maxlength="255"
      />
      <FormInput v-model="ticketPurchaseFormData.zip_code" title="PLZ" placeholder="PLZ" type="text" maxlength="5" />
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
        maxlength="255"
      />
    </div>

    <hr />

    <h4>{{ totalCost.cost.toFixed(2) }}€</h4>
    <p class="small-margin">
      {{ ticketPurchaseFormData.ticket_count }}x {{ props.event.title }} Ticket: je
      <span class="p-bold">{{ singleTicketPrice.toFixed(2) }}€</span>
    </p>
    <p v-if="appliedVoucher" class="small-margin">
      1x Gutschein: <span class="p-bold">{{ appliedVoucher.title }}: -{{ appliedVoucher.amount.toFixed(2) }}€</span>
    </p>
    <p class="small-margin highlight-red">{{ totalCost.info }}</p>
    <hr />

    <p class="small-margin">
      Aktuelles Guthaben: <span class="p-bold">{{ Number(authStore.balance).toFixed(2) }}€</span>
    </p>
    <p class="small-margin">
      Guthaben nach dem Kauf:
      <span :class="['p-bold', balanceAfterPurchaseHighlightClass]">{{ balanceAfterPurchase.toFixed(2) }}€</span>
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

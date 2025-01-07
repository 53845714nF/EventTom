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

// navigate back if no event is provided (once browser is refreshed pinia store is reset)
if (!props.event.title) {
  router.push({ name: "CEvents" });
}

const availableVouchers = ref([]);
const ticketPurchaseFormData = ref(CustomerService.provideTicketPurchaseFormData());
const authStore = useAuthStore();
const showDiscountPercentage = ref(false);

onBeforeMount(async () => {
  await CustomerService.tryGetAllVouchersForCustomer(authStore).then((result) => {
    availableVouchers.value = result.data;
  });
});

const transactionDetails = computed(() => CustomerService.getTransactionDetails(
  props.event,
  ticketPurchaseFormData.value,
  appliedVoucher.value,
  authStore.balance,
));

const appliedVoucher = computed(() =>
  CustomerService.getAppliedVoucherFromCode(ticketPurchaseFormData.value, availableVouchers),
);

const tryPostTicketPurchaseFormData = async () =>
  await CustomerService.tryPurchaseTicket(
    ticketPurchaseFormData.value,
    transactionDetails.value.balanceAfterPurchase,
    props.event,
    appliedVoucher.value,
    authStore,
  );

const changeDiscountRepresentation = () => {
  showDiscountPercentage.value = !showDiscountPercentage.value;
}
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

    <h4 v-if="appliedVoucher && !showDiscountPercentage"><s>{{ transactionDetails.totalCostExclVoucher.toFixed(2) }}€</s> {{ transactionDetails.totalCostInclVoucher.toFixed(2) }}€</h4>
    <h4 v-else-if="appliedVoucher && showDiscountPercentage">{{ transactionDetails.totalCostInclVoucher.toFixed(2) }}€ - {{ transactionDetails.voucherDiscountPercentage }}% gespart!</h4>
    <h4 v-else>{{ transactionDetails.totalCostInclVoucher.toFixed(2) }}€</h4>

    <p class="small-margin">
      {{ ticketPurchaseFormData.ticket_count }}x {{ props.event.title }} Ticket: je
      <span class="p-bold">{{ transactionDetails.singleTicketPrice.toFixed(2) }}€</span>
    </p>

    <div v-if="appliedVoucher" class="voucher-info no-margin">
      <p class="small-margin">
        1x Gutschein: <span class="p-bold">{{ appliedVoucher.title }}: -{{ appliedVoucher.amount.toFixed(2) }}€</span>
      </p>
      <div @click="changeDiscountRepresentation" class="voucher-info-icon">
        <i class="fa-solid fa-info white"></i>
      </div>
    </div>
    <p class="small-margin highlight-red">{{ transactionDetails.voucherInfo }}</p>
    
    <hr />

    <p class="small-margin">
      Aktuelles Guthaben: <span class="p-bold">{{ Number(authStore.balance).toFixed(2) }}€</span>
    </p>
    <p class="small-margin">
      Guthaben nach dem Kauf:
      <span :class="['p-bold', transactionDetails.balanceAfterPurchaseHighlightClass]">{{ transactionDetails.balanceAfterPurchase.toFixed(2) }}€</span>
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

.voucher-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.voucher-info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background-color: var(--cp-black);
  font-size: 12px; /* icon size */
}

.voucher-info-icon:hover {
  background-color: var(--cp-dark-grey);
  cursor: pointer;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import CustomerService from "@/services/CustomerService";
import { useAuthStore } from "@/stores/AuthStore";
import { ref } from "vue";

const authStore = useAuthStore();

const balanceFormData = ref(CustomerService.proviceBalanceFormData());
const paymentMethodOptions = CustomerService.providePaymentMethodOptions();

const tryTopUpBalance = async () => await CustomerService.tryTopUpBalance(balanceFormData, authStore);
</script>

<template>
  <div class="form-background">
    <div class="form-container">
      <h3>Dein Aktuelles Guthaben beträgt: {{ Number(authStore.balance).toFixed(2) }}€</h3>
      <FormInput v-model="balanceFormData.amount" title="Aufzuladender Betrag (€)" placeholder="Betrag" type="number" />
      <FormInput
        v-model="balanceFormData.payment_method"
        title="Zahlungsmethode"
        placeholder="Zahlungsmethode"
        type="select"
        :options="paymentMethodOptions"
      />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="tryTopUpBalance" text="Guthaben hinzufügen" :type="PrimaryButtonTypes.BLACK" />
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

.form-container h3 {
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

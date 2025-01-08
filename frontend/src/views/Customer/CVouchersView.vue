<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CVoucherCard from "@/components/Customer/CVouchersView/CVoucherCard.vue";
import CustomerService from "@/services/CustomerService";
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const vouchers = ref([]);
const authStore = useAuthStore(); // Initialize auth store

onBeforeMount(async () => {
  await CustomerService.tryGetAllVouchersForCustomer(authStore).then((result) => {
    vouchers.value = result.data; // Populate vouchers
  });
});
</script>

<template>
  <PageTitleContainer title="Deine Gutscheine" />
  <div class="content-container">
    <CVoucherCard v-for="voucher in vouchers" :key="voucher.id" :voucher="voucher" />
  </div>
</template>

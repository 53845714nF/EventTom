<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CVoucherCard from "@/components/Customer/CVouchersView/CVoucherCard.vue";
import CustomerService from "@/services/CustomerService";
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/AuthStore";  

const vouchers = ref([]);
const authStore = useAuthStore(); // Initialize auth store

onBeforeMount(async () => {
    await CustomerService.tryGetAllVouchersForCustomer(authStore)
    .then((result) => {
      console.log(result);
      vouchers.value = result; // Populate vouchers
    })
});
</script>

<template>
  <PageTitleContainer title="Deine Gutscheine" />
  <div v-if="vouchers.length === 0" class="no-vouchers">
    <p>Keine Gutscheine verfügbar</p>
  </div>
  <div class="content-container" v-else>
    <CVoucherCard
      v-for="voucher in vouchers"
      :key="voucher.id"
      :voucher="voucher"
    />
  </div>
</template>

<style scoped>
.content-container {
  margin: 20px;
}
.no-vouchers {
  text-align: center;
  margin: 20px;
  color: gray;
}
</style>
<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CVoucherCard from "@/components/Customer/CVouchersView/CVoucherCard.vue";
import { fetchAllVouchersForUser } from "@/services/VoucherService";  
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";  

const vouchers = ref([]);
const authStore = useAuthStore(); // Initialize auth store
console.log("Auth Store Debug:", authStore); // Debugging auth store

onMounted(async () => {
  try {
    const userId = authStore.roleId; // Dynamically fetch user ID
    const result = await fetchAllVouchersForUser(userId, authStore);  
    vouchers.value = result; // Populate vouchers
  } catch (error) {
    console.error("Failed to fetch vouchers:", error);
  }
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
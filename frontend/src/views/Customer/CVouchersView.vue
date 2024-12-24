<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CVoucherCard from "@/components/Customer/CVouchersView/CVoucherCard.vue";
import { fetchAllVouchersForUser } from "@/services/VoucherService";
import { ref, onMounted } from "vue";

const vouchers = ref([]);

onMounted(async () => {
  try {
    // Simulating fetching vouchers for a static user ID
    const userId = "static-user-id"; // I'll replace this with dynamic logic later  
    vouchers.value = await fetchAllVouchersForUser(userId);
  } catch (error) {
    console.error("Failed to fetch vouchers:", error);
  }
});
</script>

<template>
  <PageTitleContainer title="Deine Gutscheine" />
  <div class="content-container">
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
</style>

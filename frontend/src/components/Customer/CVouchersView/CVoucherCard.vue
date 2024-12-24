<script setup>
const props = defineProps({
  voucher: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="voucher-card">
    <p><strong>{{ voucher.code }}</strong></p>
    <p>Wert: {{ voucher.amount }}€</p>
    <p>Läuft ab am: {{ voucher.expiryDate }}</p>
  </div>
</template>

<style scoped>
.voucher-card {
  background-color: var(--color-customer);
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

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
    <p class="p-large small-margin">"{{ voucher.title }}"</p>
    <p>Wert: <span class="p-large small-margin">{{ voucher.amount }}€</span></p>
  </div>
</template>

<style scoped>
.voucher-card {
  background-color: var(--color-customer);
  border-radius: 10px;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

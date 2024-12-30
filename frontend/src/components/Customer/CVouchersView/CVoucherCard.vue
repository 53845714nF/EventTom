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
    <p class="p-large">"{{ voucher.title }}"</p>
    <p class="p-large p-light">
      Wert: <span class="p-large"> {{ voucher.amount }}€ </span>
    </p>
  </div>
</template>

<style scoped>
.voucher-card {
  background-color: var(--color-customer);
  border-radius: 10px;
  padding: 5px 20px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

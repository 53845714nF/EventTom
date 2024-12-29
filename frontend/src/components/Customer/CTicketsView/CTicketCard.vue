<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

console.log(props.ticket);
</script>

<template>
  <div class="ticket-card">
    <p class="p-large">{{ ticket.quantity }}x</p>
    <p class="p-large">{{ new Date(ticket.purchase_date).toISOString().split("T")[0] }}</p>
  </div>
</template>

<style scoped>
.ticket-card {
  background-color: var(--color-customer);
  border-radius: 10px;
  padding: 5px 20px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

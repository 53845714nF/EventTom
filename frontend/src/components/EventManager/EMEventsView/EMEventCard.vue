<script setup>
import EMTicketSalesCard from "./EMTicketSalesCard.vue";
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card-body">
    <div class="card-content">
      <h4>{{ event.title }}</h4>
      <p class="no-margin">{{ event.description }}</p>
    </div>
    <EMTicketSalesCard :event="event"></EMTicketSalesCard>
  </div>
</template>

<style scoped>
.card-body {
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--color-event-manager);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}

.card-content p {
  margin-top: 15px;
  margin-right: 15px;
}
</style>

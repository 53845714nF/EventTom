<script setup>
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
  background-color: var(--color-event-creator);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
</style>

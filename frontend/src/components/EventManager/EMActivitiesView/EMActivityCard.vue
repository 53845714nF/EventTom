<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const formattedDate = ref(props.activity.purchase_date.split(".")[0]);

// without watch, the formattedDate would not be updated and the date from the old "first" activity would be displayed
watch(
  () => props,
  (newProps, _) => {
    formattedDate.value = ref(newProps.activity.purchase_date.split(".")[0]);
  },
  { deep: true }
);
</script>

<template>
  <div class="card-body">
    <p class="small-margin">
      <span>[{{ formattedDate }}] </span>
      <span class="p-bold">{{ activity.user.email }}</span>
      hat
      <span class="p-bold">{{ activity.quantity }}</span>
      Tickets für
      <span class="p-bold">{{ activity.event.title }}</span>
      gekauft.
    </p>
  </div>
</template>

<style scoped>
.card-body {
  margin: 20px 40px;
  border-radius: 20px;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-event-manager);
}
</style>

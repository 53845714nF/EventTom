<script setup>
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const formattedDate = props.activity.purchase_date.split(".")[0];
console.log(`props activity: `);
console.log(props.activity);
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

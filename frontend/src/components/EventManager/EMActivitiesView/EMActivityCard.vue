<script setup>
const props = defineProps({
    activity: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div class="card-body">
        <p class="small-margin"> 
            <span>[{{ activity.timestamp }}]: </span>
            <span class="p-bold">{{ activity.user }}</span>
            hat
            <span class="p-bold">{{ activity.no_tickets }}</span>
            Tickets für 
            <span class="p-bold">{{ activity.event }}</span>
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
<script setup>
import EventCreatorService from '@/services/EventCreatorService';
import { useAuthStore } from '@/stores/AuthStore';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();

const deleteEvent = async () => await EventCreatorService.tryDeleteEvent(props.event, authStore);
</script>

<template>
  <div class="card-body">
    <div class="card-content">
      <div>
        <h4>{{ event.title }}</h4>
        <div @click="deleteEvent" class="icon-button delete-event-button">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
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

.card-content > div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.delete-event-button {
  background-color: var(--cp-white);
}

.delete-event-button:hover {
  background-color: var(--cp-light-grey);
}
</style>

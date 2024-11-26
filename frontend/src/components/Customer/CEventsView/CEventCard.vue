<script setup>
import PrimaryButton from '@/components/Basic/PrimaryButton.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="event-card">
    <h2>
      {{ event.title }}
      <span class="event-price">Preis pro Ticket: {{ event.price }}</span>
    </h2>
    <p class="event-description">{{ event.description }}</p>
    <p class="event-organizer">Name des Organisators: {{ event.organizer }}</p>
    <div class="button-container">
      <PrimaryButton
        :text="event.available ? `Noch ${event.tickets} Tickets` : 'Ausverkauft'"
        :disabled="!event.available"
        type="black"
        class="primary-button"
      />
    </div>
  </div>
</template>

<style scoped>
.event-card {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--cp-pastel-green); /* Match the background color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-card h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.event-card .event-price {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-dark);
  margin-left: 10px;
}

.event-description {
  font-size: 14px;
  color: var(--color-text-dark);
  font-weight: 300;
  margin: 5px 0;
}

.event-organizer {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-dark);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.primary-button {
  min-width: 150px;
}
</style>

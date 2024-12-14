<script setup>
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="event-card">
    <div class="card-content-container">
      <div class="heading-container">
        <h4>{{ event.title }}</h4>
        <p>
          Preis pro Ticket: <span class="p-bold">{{ event.price }}</span>
        </p>
      </div>
      <p>{{ event.description }}</p>
      <p class="p-large">{{ event.organizer }}</p>
    </div>
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
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: var(--color-customer);
  display: flex;
  flex-direction: row;
}

.card-content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.heading-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.heading-container p {
  margin: 4px 4px 4px 15px;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>

<!-- src/components/EventForm.vue -->
<template>
  <form @submit.prevent="submitEvent">
    <input v-model="eventName" placeholder="Event Name" />
    <input type="date" v-model="eventDate" />
    <input v-model="location" placeholder="Location" />
    <input type="number" v-model="ticketQuantity" placeholder="Ticket Quantity" />
    <input type="number" v-model="ticketPrice" placeholder="Ticket Price" />
    <button type="submit">Create Event</button>
  </form>
</template>

<script>
export default {
  name: 'EventForm',
  data() {
    return {
      eventName: '',
      eventDate: '',
      location: '',
      ticketQuantity: 0,
      ticketPrice: 0
    };
  },
  methods: {
    submitEvent() {
      console.log("Event created:", this.eventName);
    }
  }
};
</script>

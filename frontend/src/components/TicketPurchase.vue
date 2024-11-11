<!-- src/components/TicketPurchase.vue -->
<template>
  <div v-for="event in events" :key="event.id">
    <h3>{{ event.name }}</h3>
    <p>Available Tickets: {{ event.availableTickets }}</p>
    <button @click="purchaseTicket(event.id)">Purchase Ticket</button>
  </div>
</template>

<script>
export default {
  name: 'TicketPurchase',
  props: ['events'],
  methods: {
    purchaseTicket(eventId) {
      console.log("Ticket purchased for event:", eventId);
    }
  }
};
</script>

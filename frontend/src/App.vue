<!-- src/App.vue -->
<template>
  <div id="app">
    <AppDashboard />
    <EventForm />
    <TicketPurchase :events="events" />
    <CustomerManagement :customers="customers" />
    <AppNotifications :notifications="notifications" />
  </div>
</template>

<script>
import AppDashboard from './components/AppDashboard.vue';
import EventForm from './components/EventForm.vue';
import TicketPurchase from './components/TicketPurchase.vue';
import CustomerManagement from './components/CustomerManagement.vue';
import AppNotifications from './components/AppNotifications.vue';

export default {
  name: 'App',
  components: {
    AppDashboard,
    EventForm,
    TicketPurchase,
    CustomerManagement,
    AppNotifications
  },
  data() {
    return {
      events: [
        { id: 1, name: "Event 1", availableTickets: 20 },
        { id: 2, name: "Event 2", availableTickets: 15 }
      ],
      customers: [
        { id: 1, name: "Customer 1", lastPurchaseDate: "2023-01-01" }
      ],
      notifications: [
        { id: 1, message: "New Event Added!" }
      ]
    };
  }
};
</script>

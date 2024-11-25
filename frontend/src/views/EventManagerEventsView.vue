<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EventManagerEventCard from "@/components/EventManagerEventsView/EventManagerEventCard.vue";

const events = [
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 200,
    tickets_sold: 110,
    pred_tickets_sold: 100,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 200,
    tickets_sold: 90,
    pred_tickets_sold: 100,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 200,
    tickets_sold: 109,
    pred_tickets_sold: 100,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 200,
    tickets_sold: 91,
    pred_tickets_sold: 100,
  },
  {
    title: "Event 2",
    description: "Description 2",
    tickets: 100,
    tickets_sold: 40,
    pred_tickets_sold: 80,
  },
  {
    title: "Event 3",
    description: "Description 3",
    tickets: 150,
    tickets_sold: 120,
    pred_tickets_sold: 80,
  },
];
</script>

<template>
  <PageTitleContainer title="Anstehende Events" />
  <div class="content-container">
    <EventManagerEventCard
      v-for="event in events"
      :key="event.title"
      :event="event"
    ></EventManagerEventCard>
  </div>
</template>

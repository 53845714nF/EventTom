<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EventManagerEventCard from "@/components/EventManagerEventsView/EventManagerEventCard.vue";

const events = [
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 100,
    tickets_sold: 80,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 100,
    tickets_sold: 88,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 100,
    tickets_sold: 72,
  },
  {
    title: "Event 1",
    description: "Description 1",
    tickets: 100,
    tickets_sold: 90,
  },
  {
    title: "Event 2",
    description: "Description 2",
    tickets: 100,
    tickets_sold: 70,
  },
  {
    title: "Event 3",
    description: "Description 3",
    tickets: 100,
    tickets_sold: 10,
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

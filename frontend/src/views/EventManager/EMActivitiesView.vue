<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import EMActivityCard from "@/components/EventManager/EMActivitiesView/EMActivityCard.vue";

const activities = [
  {
    timestamp: "2021-10-10 10:10:10",
    user: "Max Mustermann",
    no_tickets: 2,
    event: "Event 1",
  },
  {
    timestamp: "2021-10-11 11:15:20",
    user: "Anna Müller",
    no_tickets: 3,
    event: "Event 2",
  },
  {
    timestamp: "2021-10-12 12:20:30",
    user: "John Doe",
    no_tickets: 1,
    event: "Event 3",
  },
  {
    timestamp: "2021-10-13 13:25:40",
    user: "Jane Smith",
    no_tickets: 4,
    event: "Event 4",
  },
  {
    timestamp: "2021-10-14 14:30:50",
    user: "Peter Parker",
    no_tickets: 2,
    event: "Event 5",
  },
  {
    timestamp: "2021-10-15 15:35:00",
    user: "Bruce Wayne",
    no_tickets: 5,
    event: "Event 6",
  },
  {
    timestamp: "2021-10-16 16:40:10",
    user: "Clark Kent",
    no_tickets: 3,
    event: "Event 7",
  },
  {
    timestamp: "2021-10-17 17:45:20",
    user: "Diana Prince",
    no_tickets: 2,
    event: "Event 8",
  },
  {
    timestamp: "2021-10-18 18:50:30",
    user: "Barry Allen",
    no_tickets: 1,
    event: "Event 9",
  },
  {
    timestamp: "2021-10-19 19:55:40",
    user: "Hal Jordan",
    no_tickets: 4,
    event: "Event 10",
  },
  {
    timestamp: "2021-10-20 20:00:50",
    user: "Arthur Curry",
    no_tickets: 2,
    event: "Event 11",
  },
  {
    timestamp: "2021-10-21 21:05:00",
    user: "Victor Stone",
    no_tickets: 5,
    event: "Event 12",
  },
  {
    timestamp: "2021-10-22 22:10:10",
    user: "Steve Rogers",
    no_tickets: 3,
    event: "Event 13",
  },
  {
    timestamp: "2021-10-23 23:15:20",
    user: "Tony Stark",
    no_tickets: 2,
    event: "Event 14",
  },
  {
    timestamp: "2021-10-24 00:20:30",
    user: "Natasha Romanoff",
    no_tickets: 1,
    event: "Event 15",
  },
  {
    timestamp: "2021-10-25 01:25:40",
    user: "Bruce Banner",
    no_tickets: 4,
    event: "Event 16",
  },
  {
    timestamp: "2021-10-26 02:30:50",
    user: "Thor Odinson",
    no_tickets: 2,
    event: "Event 17",
  },
  {
    timestamp: "2021-10-27 03:35:00",
    user: "Loki Laufeyson",
    no_tickets: 5,
    event: "Event 18",
  },
  {
    timestamp: "2021-10-28 04:40:10",
    user: "Wanda Maximoff",
    no_tickets: 3,
    event: "Event 19",
  },
  {
    timestamp: "2021-10-29 05:45:20",
    user: "Stephen Strange",
    no_tickets: 2,
    event: "Event 20",
  },
];
</script>

<template>
  <PageTitleContainer title="Aktivitäten" />
  <div class="content-container">
    <EMActivityCard
      v-for="activity in activities"
      :key="activity.timestamp"
      :activity="activity"
    />
  </div>
</template>

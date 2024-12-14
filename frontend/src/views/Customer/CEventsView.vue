<script setup>
import { ref, onMounted } from "vue";
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";
import { fetchEvents } from "@/services/CustomerService.js";

const events = ref([]);

onMounted(async () => {
  events.value = await fetchEvents();
});
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <div class="event-list">
      <CEventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
/* You dont need this class, it is defined in src/assets/main.css */
/* .content-container {
  background-color: var(--cp-light-green); 
  padding: 40px; 
  border-radius: 15px; 
  min-height: calc(100vh - 80px); 
}

.content-container > .page-title-container {
  margin-bottom: 30px;
} */

.event-list {
  display: flex;
  flex-direction: column;
}
</style>

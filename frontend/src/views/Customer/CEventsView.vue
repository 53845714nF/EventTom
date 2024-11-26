<script setup>
import { ref, onMounted } from 'vue';
import PageTitleContainer from '@/components/Basic/PageTitleContainer.vue';
import CEventCard from '@/components/Customer/CEventsView/CEventCard.vue';
import { fetchEvents } from '@/services/CustomerService.js';

const events = ref([]);

onMounted(async () => {
  events.value = await fetchEvents();
});
</script>

<template>
  <div class="content-container">
    <PageTitleContainer :title="'Ansicht Kunde'" />
    <div class="event-list">
      <CEventCard 
        v-for="event in events" 
        :key="event.id" 
        :event="event" 
      />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  background-color: var(--cp-light-green); 
  padding: 40px; 
  border-radius: 15px; 
  min-height: calc(100vh - 80px); 
}

.content-container > .page-title-container {
  margin-bottom: 30px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  padding-bottom: 40px; 
}
</style>

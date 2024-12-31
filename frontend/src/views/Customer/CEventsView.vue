<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import CustomerService from "@/services/CustomerService";
import { onBeforeMount, ref } from "vue";
import CEventCard from "@/components/Customer/CEventsView/CEventCard.vue";

const events = ref([]);

onBeforeMount(async () => {
  CustomerService.tryGetAllEvents().then((result) => {
    events.value = result.data;
  });
});
</script>

<template>
  <PageTitleContainer title="Aktuelle Events" />
  <div class="content-container">
    <CEventCard v-for="event in events" :key="event.title" :event="event"></CEventCard>
  </div>
</template>

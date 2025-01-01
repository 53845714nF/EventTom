<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import { useAuthStore } from "@/stores/AuthStore";
import EventCreatorService from "@/services/EventCreatorService";
import { onBeforeMount, ref, computed, watch } from "vue";

const authStore = useAuthStore();
const event = ref(EventCreatorService.provideEmptyEvent());
const eventManagers = ref([]);

onBeforeMount(async () => {
  await EventCreatorService.getAllEventManagers(authStore).then((result) => {
    eventManagers.value = result.data;
  });
});

const eventManagerEmailOptions = computed(() => eventManagers.value.map((eventManager) => eventManager.email));

watch(
  () => event.value.event_manager_email,
  (newEmail) => {
    event.value.event_manager_id = EventCreatorService.getEventManagerIdByEmail(newEmail, eventManagers.value);
  },
);

const tryPostEvent = async () => await EventCreatorService.tryPostNewEvent(event, authStore);
</script>

<template>
  <div class="form-background">
    <div class="form-container">
      <FormInput
        v-model="event.title"
        title="Name des Events"
        placeholder="Name des Events"
        type="text"
        maxlength="255"
      />
      <FormInput
        v-model="event.description"
        title="Beschreibung"
        placeholder="Beschreibung"
        type="textarea"
        maxlength="1024"
      />
      <FormInput v-model="event.base_price" title="Preis" placeholder="Preis" type="number" />
      <FormInput v-model="event.pay_fee" title="Gebühr" placeholder="Gebühr" type="number" />
      <FormInput v-model="event.total_tickets" title="Anzahl Tickets" placeholder="Anzahl Tickets" type="number" />
      <FormInput v-model="event.threshold" title="Threshold" placeholder="Threshold" type="number" />
      <FormInput
        v-model="event.event_manager_email"
        title="Event Manager"
        placeholder="Event Manager"
        type="select"
        :options="eventManagerEmailOptions"
      />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="tryPostEvent" text="Event erstellen" :type="PrimaryButtonTypes.BLACK" />
    </div>
  </div>
</template>

<style scoped>
.form-background {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--color-event-creator);
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 0;
}
</style>

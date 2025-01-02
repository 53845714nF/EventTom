<script setup>
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import CustomerService from "@/services/CustomerService";
import { useTicketPurchaseStore } from "@/stores/TicketPurchaseStore";
import { ref } from "vue";

const ticketPurchaseStore = useTicketPurchaseStore();

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const setEventInStore = () => ticketPurchaseStore.setEvent(props.event);

const cardInfo = ref(CustomerService.getEventCardInfo(props.event)); // TODO: maybe needs some refactoring
</script>

<template>
  <div :class="['event-card', cardInfo.cssClass]">
    <div class="heading-container">
      <div>
        <h4>{{ event.title }}</h4>
        <p>
          Preis pro Ticket:
          <span class="p-bold">{{ CustomerService.calculateSingleTicketPrice(event).toFixed(2) }}€</span>
        </p>
      </div>
      <PrimaryButton
        :onClick="setEventInStore"
        :text="cardInfo.sold_out ? 'Ausverkauft' : `Noch ${event.total_tickets - event.sold_tickets} Tickets`"
        type="black"
        class="primary-button"
        :to="cardInfo.to"
      />
    </div>
    <!--TODO: maybe add Eventmanager to see who is responsible for this event?-->
    <p class="blocktext">{{ event.description }}</p>
  </div>
</template>

<style scoped>
.event-card {
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
}

.card-content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.heading-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.heading-container p {
  margin: 4px 4px 4px 15px;
}

.heading-container div:first-of-type {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>

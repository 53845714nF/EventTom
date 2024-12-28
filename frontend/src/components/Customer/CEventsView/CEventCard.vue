<script setup>
import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
import CustomerService from '@/services/CustomerService';
import { useTicketPurchaseStore } from '@/stores/TicketPurchaseStore';

const ticketPurchaseStore = useTicketPurchaseStore();

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const setEventInStore = () => {
  ticketPurchaseStore.setEvent(props.event);
};

</script>

<template>
  <div class="event-card">
    <div class="card-content-container">
      <div class="heading-container">
        <h4>{{ event.title }}</h4>
        <p>
          Preis pro Ticket: <span class="p-bold">{{ CustomerService.calculateSingleTicketPrice(event) }}€</span>
        </p>
      </div>
      <p>{{ event.description }}</p>
      <!--TODO: maybe add Eventmanager to see who is responsible for this event?-->
    </div>
    <div class="button-container">
      <!--TODO: get correct number of remaining Tickets or put "ausverkauft" in the button-->
      <PrimaryButton
        :onClick="setEventInStore"
        :text="`Noch ${event.total_tickets - event.sold_tickets} Tickets`"
        type="black"
        class="primary-button"
        to="/customer/purchase_ticket"
      />
    </div>
  </div>
</template>

<style scoped>
.event-card {
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: var(--color-customer);
  display: flex;
  flex-direction: row;
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
  justify-content: flex-start;
  align-items: flex-end;
}

.heading-container p {
  margin: 4px 4px 4px 15px;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>

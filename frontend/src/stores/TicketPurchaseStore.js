import { defineStore } from "pinia";
import { ref } from "vue";

export const useTicketPurchaseStore = defineStore("ticketPurchase", () => {
  const event = ref({});

  function setEvent(newEvent) {
    event.value = newEvent;
  }

  function removeEvent() {
    event.value = {};
  }

  // you have to return every state property in order for pinia to work properly
  return {
    event,
    setEvent,
    removeEvent,
  };
});

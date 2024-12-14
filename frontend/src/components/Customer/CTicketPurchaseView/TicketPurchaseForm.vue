<script setup>
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import SecondaryButton from "@/components/Basic/SecondaryButton.vue";
import FormInput from "@/components/Basic/FormInput.vue";
import TicketPurchaseService from "@/services/TicketPurchaseService.js";
import { ref, computed } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const form = ref({
  name: "",
  address: "",
  cityZip: "",
  ticketCount: 1,
  voucherCode: "",
});

const discount = ref(0);

const totalPrice = computed(() => {
  return form.value.ticketCount * props.event.price - discount.value;
});

const priceBreakdown = computed(() => {
  let breakdown = [];
  breakdown.push(`${form.value.ticketCount}x ${props.event.title} Ticket: je ${props.event.price}€`);
  if (discount.value > 0) {
    breakdown.push(`1x Gutschein ${form.value.voucherCode}: -${discount.value}€`);
  }
  return breakdown;
});

const handlePurchase = async () => {
  try {
    const ticketData = {
      eventId: props.event.id,
      name: form.value.name,
      address: form.value.address,
      cityZip: form.value.cityZip,
      ticketCount: form.value.ticketCount,
      voucherCode: form.value.voucherCode,
    };

    await TicketPurchaseService.purchaseTicket(ticketData);
    alert("Ticket purchase successful! 🎉");
  } catch (error) {
    alert(error.message);
  }
};

const validateVoucher = async () => {
  try {
    const response = await TicketPurchaseService.validateVoucherCode(form.value.voucherCode);
    if (response.valid) {
      discount.value = response.discount;
      alert(`Voucher applied: -${response.discount}€`);
    } else {
      discount.value = 0;
      alert("Invalid voucher code");
    }
  } catch (error) {
    console.error("Voucher validation failed:", error);
  }
};
</script>

<template>
  <div class="ticket-purchase-card">
    <div class="header-container">
      <div class="heading-container">
        <h2>{{ props.event.title }}</h2>
        <p>{{ props.event.organizer }}</p>
        <p>{{ props.event.description }}</p>
      </div>
      <PrimaryButton
        :text="`Noch ${props.event.availableTickets} Tickets`"
        :disabled="props.event.availableTickets <= 0"
        type="black"
        class="availability-button"
      />
    </div>

    <!-- Form Fields -->
    <div class="form-fields">
      <FormInput v-model="form.name" title="Name" placeholder="Name" type="text" />
      <FormInput
        v-model="form.address"
        title="Straße, Hausnummer"
        placeholder="Straße, Hausnummer"
        type="text"
      />
      <FormInput
        v-model="form.cityZip"
        title="PLZ, Ort"
        placeholder="PLZ, Ort"
        type="text"
      />
      <div class="tickets-container">
        <FormInput
          v-model="form.ticketCount"
          title="Anzahl Tickets"
          placeholder="Anzahl Tickets"
          type="number"
        />
        <p class="base-price">Basispreis: {{ props.event.price }}€</p>
      </div>
      <FormInput
        v-model="form.voucherCode"
        title="Gutscheincode"
        placeholder="Gutscheincode"
        type="text"
        @blur="validateVoucher"
      />
    </div>

    <!-- Summary Section -->
    <div class="summary-container">
      <h3>{{ totalPrice }}€</h3>
      <ul>
        <li v-for="item in priceBreakdown" :key="item">{{ item }}</li>
      </ul>
    </div>

    <!-- Buttons -->
    <div class="button-container">
      <PrimaryButton
        :text="'Jetzt kaufen'"
        @click="handlePurchase"
        type="black"
      />
      <SecondaryButton :text="'Abbrechen'" />
    </div>
  </div>
</template>

<style scoped>
.ticket-purchase-card {
  margin: 25px 40px;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: var(--color-customer);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.heading-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.availability-button {
  margin-left: auto;
  background-color: var(--color-primary-button-black);
}

.availability-button:hover {
  background-color: var(--color-primary-button-black-hover);
}

.tickets-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.base-price {
  font-size: 14px;
  font-weight: bold;
  color: var(--color-text-dark);
  padding-left: 4%;
}

.summary-container {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-text-dark);
}

.summary-container h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.summary-container ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

<script setup>
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import SecondaryButton from "@/components/Basic/SecondaryButton.vue";
import FormInput from "@/components/Basic/FormInput.vue";
import CustomerService from "@/services/CustomerService";
import TicketPurchaseService from "@/services/TicketPurchaseService";
import ToasterService from "@/services/ToasterService";
import { ref, computed } from "vue";

// Props: The event details are passed as props from the parent component
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

// Form data: Initialized using the `provideEmptyForm` method from CustomerService
const form = ref(provideEmptyForm());

// Reactive variable to track discount value
const discount = ref(0);

// Computed property: Calculates the total price based on ticket count and discount
const totalPrice = computed(() => {
  return form.value.ticketCount * props.event.price - discount.value;
});

// Computed property: Provides a breakdown of the price details
const priceBreakdown = computed(() => {
  let breakdown = [];
  breakdown.push(
    `${form.value.ticketCount}x ${props.event.title} Ticket: je ${props.event.price}€`
  );
  if (discount.value > 0) {
    breakdown.push(
      `1x Gutschein ${form.value.voucherCode}: -${discount.value}€`
    );
  }
  return breakdown;
});

// Method: Handles the ticket purchase
const handlePurchase = async () => {
  try {
    // Build the ticket purchase data
    const ticketData = {
      eventId: props.event.id,
      name: form.value.name,
      address: form.value.address,
      cityZip: form.value.cityZip,
      ticketCount: form.value.ticketCount,
      voucherCode: form.value.voucherCode,
    };

    // Call the service to purchase tickets
    await TicketPurchaseService.purchaseTicket(ticketData);

    // Show success toast notification
    ToasterService.createToasterPopUp(
      "success",
      "Ticket purchase successful! 🎉"
    );

    // Reset form after successful purchase
    form.value = provideEmptyForm();
    discount.value = 0;
  } catch (error) {
    // Show error toast notification
    ToasterService.createToasterPopUp("error", error.message);
  }
};

// Method: Validates the voucher code
const validateVoucherCode = async () => {
  try {
    // Call the service to validate the voucher code
    const response = await validateVoucher(form.value.voucherCode);

    if (response.valid) {
      // Apply discount if voucher is valid
      discount.value = response.discount;
      ToasterService.createToasterPopUp(
        "success",
        `Voucher applied: -${response.discount}€`
      );
    } else {
      // Reset discount if voucher is invalid
      discount.value = 0;
      ToasterService.createToasterPopUp("error", "Invalid voucher code");
    }
  } catch (error) {
    console.error("Voucher validation failed:", error);
    ToasterService.createToasterPopUp("error", "Error validating voucher");
  }
};
</script>

<template>
  <div class="ticket-purchase-card">
    <!-- Event Header -->
    <div class="header-container">
      <div class="heading-container">
        <h2>{{ props.event.title }}</h2>
        <p>{{ props.event.organizer }}</p>
        <p>{{ props.event.description }}</p>
      </div>

      <!-- Available tickets: Styled as text instead of a button -->
      <div class="available-tickets">
        Noch {{ props.event.availableTickets }} Tickets
      </div>
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
        @blur="validateVoucherCode"
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
      <PrimaryButton :text="'Jetzt kaufen'" @click="handlePurchase" type="black" />
      <SecondaryButton :text="'Abbrechen'" />
    </div>
  </div>
</template>

<style scoped>
/* Styles for the ticket purchase card */
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

.available-tickets {
  margin-left: auto;
  font-size: 14px;
  font-weight: bold;
  color: var(--cp-white);
  background-color: var(--color-text-dark);
  padding: 10px 20px;
  border-radius: 15px;
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

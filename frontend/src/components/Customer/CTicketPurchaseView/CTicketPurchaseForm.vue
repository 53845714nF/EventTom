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

// TODO: should be provided by CustomerService. See: AdminService.provideEmptyVoucher
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

// TODO: put this logic in CustomerService
// TODO: this method should validate the form fields (like not having empty values or invalid ticket count)
// -> you can use the FormValidatorService for this
const handlePurchase = async () => {
  // Try this logic for validating the form and try to comprehend what this does.
  // I implemented the baseline structure for the getValidationRules(), you just have to add the rules you need

  // VALIDATION LOGIC STARTS HERE
  // const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_USER);
  // const validationError = FormValidatorService.validateForm(user.value, validationRules);

  // if (validationError) {
  //   ToasterService.createToasterPopUp("error", validationError);
  //   return;
  // }
  // VALIDATION LOGIC ENDS HERE

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

    // TODO: dont use alert, use a toast notification. See: ToasterService
    alert("Ticket purchase successful! 🎉");
  } catch (error) {
    // TODO: dont use alert, use a toast notification. See: ToasterService
    alert(error.message);
  }
};

// TODO: put this logic in CustomerService
// ideally, this method should fetch all available voucher for the CURRENT CUSTOMER and check if the code matches with one of those
// at the moment you can only check if the code is valid for any given voucher. You have to put the customer id in the request
// But this is not possible at the moment since the backend does not provide the necessary endpoint yet.
// I will get in touch with you as soon as you can implement this.
const validateVoucher = async () => {
  try {
    const response = await TicketPurchaseService.validateVoucherCode(form.value.voucherCode);
    if (response.valid) {
      discount.value = response.discount;

      // TODO: dont use alert, use a toast notification. See: ToasterService
      alert(`Voucher applied: -${response.discount}€`);
    } else {
      discount.value = 0;

      // TODO: dont use alert, use a toast notification. See: ToasterService
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

      <!--TODO: Try if you can find another way of showing the available tickets without a button. I know, in the Design Guideline it looks like a button, but it looks kinda confusing to have a button that you cant interact with. Its my fault, sorry -->
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
      <FormInput v-model="form.address" title="Straße, Hausnummer" placeholder="Straße, Hausnummer" type="text" />
      <FormInput v-model="form.cityZip" title="PLZ, Ort" placeholder="PLZ, Ort" type="text" />
      <div class="tickets-container">
        <FormInput v-model="form.ticketCount" title="Anzahl Tickets" placeholder="Anzahl Tickets" type="number" />
        <p class="base-price">Basispreis: {{ props.event.price }}€</p>
      </div>

      <!--TODO: You can include the validateVoucher() method as an extra step inside the handlePurchase() method, 
      I think this should be easier to implement since you have to verify if the voucher is valid before making the request anyways-->
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
      <PrimaryButton :text="'Jetzt kaufen'" @click="handlePurchase" type="black" />
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

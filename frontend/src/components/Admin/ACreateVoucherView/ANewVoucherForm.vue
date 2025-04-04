<script setup>
import FormInput from "@/components/Basic/FormInput.vue";
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import AdminService from "@/services/AdminService";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
import { useAuthStore } from "@/stores/AuthStore";
import { computed, onBeforeMount, ref, watch } from "vue";

const authStore = useAuthStore();
const voucher = ref(AdminService.provideEmptyVoucher());
const users = ref([]);

onBeforeMount(async () => {
  await AdminService.tryGetAllUsers(authStore).then((options) => {
    users.value = options;
  });
});

const ownerEmailOptions = computed(() => AdminService.provideVoucherOwnerEmailOptions(users.value));

// compute the correct user_id for the selected email
// selecting the user_id itself would not be beneficial since it is too complex
watch(
  () => voucher.value.owner_email,
  (newEmail) => {
    voucher.value.owner_id = AdminService.getUserIdByEmail(newEmail, users.value);
  },
);

const tryPostVoucher = async () => await AdminService.tryPostNewVoucher(voucher, authStore);
</script>

<template>
  <div class="form-background">
    <div class="form-container">
      <FormInput v-model="voucher.amount" title="Betrag (€)" placeholder="Betrag" type="number" />
      <FormInput
        v-model="voucher.code_name"
        title="Gutscheincode"
        placeholder="Gutscheincode"
        type="text"
        maxlength="255"
      />
      <FormInput
        v-model="voucher.owner_email"
        title="Kunden Email"
        placeholder="Kunden Email"
        type="select"
        :options="ownerEmailOptions"
      />
    </div>
    <div class="button-container">
      <PrimaryButton :onClick="tryPostVoucher" text="Gutschein erstellen" :type="PrimaryButtonTypes.BLACK" />
    </div>
  </div>
</template>

<style scoped>
.form-background {
  padding: 20px 40px;
  margin: 10px 40px;
  border-radius: 25px;
  background-color: var(--color-auth);
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

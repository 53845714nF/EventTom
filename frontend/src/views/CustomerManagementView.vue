<!-- src/components/CustomerManagement.vue -->
<template>
  <table>
    <tr v-for="customer in customers" :key="customer.id">
      <td>{{ customer.name }}</td>
      <td>{{ customer.lastPurchaseDate }}</td>
      <td><button @click="issueVoucher(customer.id)">Issue Voucher</button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'CustomerManagement',
  props: ['customers'],
  methods: {
    issueVoucher(customerId) {
      console.log("Voucher issued for customer:", customerId);
    }
  }
};
</script>

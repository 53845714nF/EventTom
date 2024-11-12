<!-- src/components/AppDashboard.vue -->
<script setup>
// import components inside the script tag and use them in the template
import MyComponent from '@/components/MyComponent.vue';
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <!-- Add dashboard components like charts or stats here -->
    <MyComponent />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
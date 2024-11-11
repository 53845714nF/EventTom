<!-- src/components/AppNotifications.vue -->
<template>
  <div>
    <p v-for="notification in notifications" :key="notification.id">{{ notification.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppNotifications',
  props: ['notifications']
};
</script>

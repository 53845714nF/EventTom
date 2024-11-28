<script setup>
import { RouterLink, RouterView } from "vue-router";
import EvenTomHeader from "./components/Basic/EvenTomHeader.vue";
import EvenTomFooter from "./components/Basic/EvenTomFooter.vue";
</script>

<template>
  <div class="container">
    <EvenTomHeader />
    <div class="router-view-container">
      <!-- This is where the view for the current route will be rendered -->
      <RouterView />
    </div>
    <EvenTomFooter />
  </div>
</template>

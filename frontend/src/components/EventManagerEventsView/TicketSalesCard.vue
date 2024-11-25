<script setup>
import { computed, ref } from "vue";
import EventManagerService from "@/services/EventManagerService";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const showPercentage = ref(true);

const percentageComparedToExpected = computed(() =>
  EventManagerService.getPercentageOfTicketsSoldComparedToExpected(
    props.event.tickets_sold,
    props.event.pred_tickets_sold,
  ),
);

const highLightClass = computed(() =>
  EventManagerService.getHighlightClass(percentageComparedToExpected.value),
);

const comparisonText = computed(() =>
  EventManagerService.getComparisonText(percentageComparedToExpected.value),
);

const switchView = () => (showPercentage.value = !showPercentage.value);
</script>

<template>
  <div class="sales-card-body">
    <div v-if="showPercentage">
      <p class="white p-large small-margin">
        {{ props.event.tickets_sold }} Tickets verkauft
      </p>
      <p class="white small-margin">
        <span :class="[highLightClass, 'p-bold']"
          >{{ Math.abs(percentageComparedToExpected) }}% {{ comparisonText }}
        </span>
        als erwartet
      </p>
    </div>

    <div v-else>
      <p class="white p-large small-margin">Bar View</p>
    </div>

    <div @click="switchView" class="switch-view-button">
      <p class="black p-large">+</p>
    </div>
  </div>
</template>

<style scoped>
.sales-card-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  background-color: black;
  border-radius: 20px;
  padding: 10px 15px;
}

.switch-view-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cp-white);
  border-radius: 15px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: 0.4s;
}

.switch-view-button:hover {
  background-color: var(--cp-light-grey);
}
</style>

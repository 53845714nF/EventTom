<script setup>
import { computed, ref } from "vue";
import EventManagerService from "@/services/EventManagerService";
import DevVariables from "@/constants/DevVariables";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const showPercentage = ref(true);
const switchView = () => (showPercentage.value = !showPercentage.value);

const percentageSold = computed(() => {
  return EventManagerService.getPercentageOfTicketsSold(
    props.event.tickets,
    props.event.tickets_sold,
  );
});

const percentageComparedToExpected = computed(() =>
  EventManagerService.getPercentageOfTicketsSoldComparedToExpected(
    props.event.tickets,
    props.event.tickets_sold,
    DevVariables.TICKET_THRESHOLD,
  ),
);

const highLightClass = computed(() =>
  EventManagerService.getHighlightClass(percentageComparedToExpected.value),
);

const comparisonText = computed(() =>
  EventManagerService.getComparisonText(percentageComparedToExpected.value),
);
</script>

<template>
  <div class="sales-card-body">
    <div v-if="showPercentage" class="sales-card-text-container">
      <p class="white p-large small-margin">
        {{ props.event.tickets_sold }} Tickets verkauft
      </p>
      <p class="white small-margin">
        <span :class="[highLightClass.text, 'p-bold']"
          >{{ Math.abs(percentageComparedToExpected) }}% {{ comparisonText }}
        </span>
        als erwartet
      </p>
    </div>

    <div v-else class="sales-card-text-container">
      <p class="white p-large small-margin">
        {{ props.event.tickets_sold }} / {{ props.event.tickets }} Tickets
      </p>
      <div class="progress-bar small-margin">
        <div
          :class="['progress-bar-fill', highLightClass.bar]"
          :style="{ width: percentageSold + '%' }"
        ></div>
      </div>
    </div>

    <div class="switch-view-button-container">
      <div @click="switchView" class="switch-view-button">
        <i v-if="showPercentage" class="fa-solid fa-chart-simple"></i>
        <i v-else class="fa-solid fa-percent"></i>
      </div>
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

.sales-card-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
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

.switch-view-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
}

.switch-view-button:hover {
  background-color: var(--cp-light-grey);
}

.progress-bar {
  background-color: var(--cp-dark-grey);
  border-radius: 10px;
  width: 90%;
  height: 20px;
}

.progress-bar-fill {
  border-radius: 10px;
  height: 100%;
}
</style>

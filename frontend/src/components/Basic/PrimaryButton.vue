<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: String,
    text: String,
    type: String,
})

</script>

<template>
    <!-- If the button has a to prop, it will be a router link, otherwise it will be a normal div -->
    <RouterLink v-if="props.to" :to="props.to">
        <div :class="['primary-button', { 'button-black': props.type === 'black', 'button-green': props.type === 'green' }]">
            <p :class="['p-large no-margin', { 'p-white': props.type === 'black', 'p-black': props.type === 'green' }]">{{ props.text }}</p>
        </div>
    </RouterLink>

    <div v-else :class="['primary-button', { 'button-black': props.type === 'black', 'button-green': props.type === 'green' }]">
        <p :class="['p-large no-margin', { 'p-white': props.type === 'black', 'p-black': props.type === 'green' }]">{{ props.text }}</p>
    </div>
</template>

<style scoped>
.primary-button {
    font-family: FunnelDisplay;
    text-align: center;
    padding: 10px 40px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.4s;
    width: fit-content;
}

.button-green {
    background-color: var(--color-primary-button-green);
}

.button-green:hover {
    background-color: var(--color-primary-button-green-hover);
}

.p-white {
    color: var(--color-text-white);
}

.button-black {
    background-color: var(--color-primary-button-black);
}

.button-black:hover {
    background-color: var(--color-primary-button-black-hover);
}

.p-black {
    color: var(--color-text-dark);
}
</style>
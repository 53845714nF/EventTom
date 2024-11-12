<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: String,
    text: String,
    type: String,
})

</script>

<template>
    <RouterLink :to="props.to">
        <div class="secondary-button">
            <p :class="['p-large no-margin', { 'p-black': props.type === 'black', 'p-white': props.type === 'white' }]">{{ props.text }}</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.secondary-button {
    font-family: FunnelDisplay;
    background-color: transparent;
    text-align: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.4s;
    width: fit-content;
}

.secondary-button:hover p {
    color: var(--color-text-green);
}

.p-white {
    color: var(--color-text-white);
}

.p-black {
    color: var(--color-text-dark);
}
</style>
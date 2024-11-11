<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: String,
    text: String,
})

</script>

<template>
    <RouterLink :to="props.to">
        <div class="primary-button">
            <p class="p-large no-margin">{{ props.text }}</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.primary-button {
    font-family: FunnelDisplay;
    background-color: var(--color-primary-button);
    color: var(--color-text-black);
    text-align: center;
    padding: 10px 40px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.4s;
    width: fit-content;
}
</style>
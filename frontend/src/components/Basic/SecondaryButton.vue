<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { SecondaryButtonTypes } from '@/constants/ButtonTypes';

const props = defineProps({
    to: String,
    text: String,
    type: {
        type: String,
        validator: (value) => Object.values(SecondaryButtonTypes).includes(value),
        default: SecondaryButtonTypes.BLACK,
    },
})

const buttonClass = computed(() => {
    switch (props.type) {
        case SecondaryButtonTypes.BLACK:
            return 'p-black';
        case SecondaryButtonTypes.WHITE:
            return 'p-white';
        default:
            return 'p-black';
    }
});

</script>

<template>
    <RouterLink v-if="props.to" :to="props.to">
        <div class="secondary-button">
            <p :class="['p-large no-margin', buttonClass]">{{ props.text }}</p>
        </div>
    </RouterLink>

    <div v-else: class="secondary-button">
            <p :class="['p-large no-margin', buttonClass]">{{ props.text }}</p>
        </div>
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
    text-decoration: underline;
}

.p-white {
    color: var(--color-text-white);
}

.p-black {
    color: var(--color-text-dark);
}
</style>
<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { PrimaryButtonTypes } from '@/constants/ButtonTypes';
import PrimaryButtonService from '@/services/PrimaryButtonService';

const props = defineProps({
    to: String,
    text: String,
    type: {
        type: String,
        validator: (value) => Object.values(PrimaryButtonTypes).includes(value),
        default: PrimaryButtonTypes.GREEN,
    },
    onClick: {
        type: Function,
        required: false,
    }
});

const divCssClass = computed(() => PrimaryButtonService.provideDivCssClass(props.type));
const textCssClass = computed(() => PrimaryButtonService.provideTextCssClass(props.type));

const onClick = () => {
    if (props.onClick) {
        props.onClick();
    }
};

</script>

<template>
    <!-- If the button has a to prop, it will be a router link, otherwise it will be a normal div -->
    <RouterLink v-if="props.to" :to="props.to" @click="onClick()">
        <div :class="['primary-button', divCssClass]">
            <p :class="['p-large no-margin', textCssClass]">{{ props.text }}</p>
        </div>
    </RouterLink>

    <div v-else :class="['primary-button', divCssClass]" @click="onClick()">
        <p :class="['p-large no-margin', textCssClass]">{{ props.text }}</p>
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
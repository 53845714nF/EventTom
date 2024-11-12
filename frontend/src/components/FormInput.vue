<script setup>
const props = defineProps({
    title: String,
    placeholder: String
});
</script>

<template>
    <div class="form-input">
        <p class="p-large form-heading-margin">{{props.title}}</p>
        <input type="text" :placeholder="props.placeholder"/>
    </div>
</template>

<style scoped>

.form-input {
    max-width: 50%;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: var(--color-text-black);
    font-family: FunnelDisplay;
    font-size: 14px;
}

input::placeholder {
    color: var(--color-text-light);
    font-family: FunnelDisplay;
    font-size: 14px;
}
</style>
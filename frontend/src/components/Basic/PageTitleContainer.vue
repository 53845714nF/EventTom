<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="page-title-container">
        <h2 class="white">{{ props.title }}</h2>
    </div>
</template>

<style scoped>
.page-title-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 40px;
    border-radius: 25px;
    background-color: var(--color-page-title);
}
</style>
<script setup>
import PrimaryButton from './PrimaryButton.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <h4 class="header-item">EvenTom</h4>
        <nav>
            <RouterLink to="/" class="p-large header-item">Home</RouterLink>
            <RouterLink to="/" class="p-large header-item">About</RouterLink>
            <RouterLink to="/dashboard" class="p-large header-item">Dashboard</RouterLink>
        </nav>
        <PrimaryButton text="Login" to="/" type="green" class="header-item"/>
    </header>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0 30px 0;
}

.header-item {
    margin: 0 20px;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-text-black);
}

.header-item:hover {
    color: var(--color-text-green);
}
</style>
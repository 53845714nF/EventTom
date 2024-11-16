<script setup>
import { ref, watch, computed } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import { RouterLink, useRouter } from 'vue-router';
import HeaderService from '@/services/HeaderService';
import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const navItems = computed(() => HeaderService.getNavItems(authStore.role));
const primaryButtonAttributes = computed(() => HeaderService.getPrimaryButtonAttributes(authStore.userAuthenticated));

const handlePrimaryButtonClick = () => {
    if (authStore.userAuthenticated) {
        AuthService.logoutUser(authStore);
    }
}
</script>

<template>
    <header>
        <h4 class="nav-item">EvenTom</h4>
        <nav class="nav-item-container">
            <RouterLink v-for="(item, index) in navItems" :key="index" :to="item.path" class="p-large nav-item">{{item.title}}</RouterLink>
        </nav>
        <PrimaryButton
            @click="handlePrimaryButtonClick" 
            :text="primaryButtonAttributes.title" 
            :to="primaryButtonAttributes.path" 
            type="green" 
            class="nav-item"
        />
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

.nav-item-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.nav-item {
    margin: 0 20px;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-text-black);
}

.nav-item:hover {
    color: var(--color-text-green);
}
</style>
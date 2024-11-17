<script setup>
import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const testToken = () => AuthService.testAccessToken(authStore);
</script>

<template>
    <footer>
        <p class="p-large light">2024 EvenTom</p>
        <div class="footer-container">
            <p class="light footer-element">Kontakt</p>
            <p class="light footer-element">About</p>
            <p class="light footer-element">Karriere</p>
        </div>
        <div class="footer-container">
            <p class="light footer-element">LinkedIn</p>
            <p @click="testToken" class="light footer-element">Test Token</p>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" class="light footer-element">YouTube</a>
        </div>
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid var(--color-text-light);
    flex-wrap: wrap;
    position: absolute;
    bottom: 0;
    width: calc(100% - 80px);
}

a {
    text-decoration: none;
    font-family: FunnelDisplay;
    font-size: 14px;
    color: var(--color-text-light);
    font-weight: 300;
    cursor: pointer;
}

.footer-container {
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.footer-element {
    margin: 0 20px;
}
</style>
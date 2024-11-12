<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
</script>

<template>
    <div class="main-container">
        <div class="content-wrapper">
            <h1>Das ist der Slogan von EvenTom</h1>
            <p class="white margin-top-bottom">Hier stehen ein paar coole Sachen bezuüglich EvenTom. Also was die App so kann und warum du sie nutzen solltest.</p>
            <div class="button-container">
                <PrimaryButton to="/" text="Login" type="green"/>
                <SecondaryButton to="/dashboard" text="Dashboard" type="white"/>
            </div>
        </div>
    </div>
    <RouterLink to="/dashboard">Go to AppDashboard</RouterLink> <!-- This is a link to a View. the to="" parameter must reference a valid path from /router/index.js -->
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--cp-black);
    border-radius: 40px;
}

.content-wrapper {
    max-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px 0 150px 50px;
}

.margin-top-bottom {
    margin: 25px 0;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
</style>
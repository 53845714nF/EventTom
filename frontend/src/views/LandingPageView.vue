<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
</script>

<template>
    <div class="main-container">
        <div class="main-wrapper">
            <h1>Das ist der Slogan von EvenTom</h1>
            <p class="white margin-top-bottom">Hier stehen ein paar coole Sachen bezuüglich EvenTom. Also was die App so kann und warum du sie nutzen solltest.</p>
            <div class="button-container">
                <PrimaryButton to="/" text="Login" type="green"/>
                <SecondaryButton to="/dashboard" text="Dashboard" type="white"/>
            </div>
        </div>
    </div>
    <div class="content-container">
        <h2>Das ist ein weiterer Abschnitt</h2>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--cp-black);
    border-radius: 40px;
    padding: 70px 0 150px 70px;
}

.main-wrapper {
    max-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

.content-container {
    padding: 20px 20px;
}
</style>
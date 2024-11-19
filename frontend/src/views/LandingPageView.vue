<script setup>
import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
import SecondaryButton from '@/components/Basic/SecondaryButton.vue';
import { PrimaryButtonTypes, SecondaryButtonTypes } from '@/constants/ButtonTypes';
</script>

<template>
    <div class="main-container">
        <div class="main-wrapper">
            <h1>Das ist der Slogan von EvenTom</h1>
            <p class="white margin-top-bottom">Hier stehen ein paar coole Sachen bezuüglich EvenTom. Also was die App so kann und warum du sie nutzen solltest.</p>
            <div class="button-container">
                <PrimaryButton to="/auth/signup" text="Registrieren" :type="PrimaryButtonTypes.GREEN"/>
                <SecondaryButton to="/auth/signin" text="Login" :type="SecondaryButtonTypes.WHITE"/>
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
    max-width: 50%;
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
</style>
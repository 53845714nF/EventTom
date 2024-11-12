<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import FormInput from '../Basic/FormInput.vue';
import PrimaryButton from '../Basic/PrimaryButton.vue';
import SecondaryButton from '../Basic/SecondaryButton.vue';

// use the route to get the type parameter
const route = useRoute();
const type = ref(route.params.type);

// watch for changes in route.params.type
watch(
  () => route.params.type,
  (newType) => {
    type.value = newType;
  }
);

// computed value für `signUp` und `secondaryButtonRedirect`
// computed is used to derive a value from other reactive values
// in this case, `type` is a reactive value and `signUp` and `secondaryButtonRedirect` are derived from it
// `signUp` and `secondaryButtonRedirect` are reactive values as well
const signUp = computed(() => type.value === 'signup');
const secondaryButtonRedirect = computed(() => (signUp.value ? 'signin' : 'signup'));

// Textwerte für die Buttons basierend auf `signUp`
const signUpText = {
  primary: 'Registrieren',
  secondary: 'Ich habe schon ein Konto',
};
const signInText = {
  primary: 'Anmelden',
  secondary: 'Ich habe noch kein Konto',
};
const buttonText = computed(() => (signUp.value ? signUpText : signInText));
</script>

<template>
    <div class="form-background">
        <h3 class="heading-margin">Willkommen bei EvenTom!</h3>
        <div class="form-container">
            <FormInput title="Name" placeholder="Arne123"/>
            <FormInput v-if="signUp" title="E-Mail" placeholder="feet.lover@gmail.com"/>
            <FormInput title="Passwort" placeholder="Passwort"/>
            <FormInput v-if="signUp" title="Passwort wiederholen" placeholder="Passwort"/>
        </div>
        <div class="button-container">
            <PrimaryButton to="/" :text="buttonText.primary" type="green"/>
            <SecondaryButton :to="`/auth/${secondaryButtonRedirect}`" :text="buttonText.secondary" type="black"/>
        </div>
    </div>
</template>

<!-- <template>
    <div class="form-background">
        <h3 class="heading-margin">Willkommen bei EvenTom!</h3>
        <div class="form-container">
            <div class="form-part">
                <FormInput title="Name" placeholder="Arne123"/>
                <FormInput title="E-Mail" placeholder="feet.lover@gmail.com"/>
            </div>
            <div class="form-part">
                <FormInput title="Passwort" placeholder="Passwort"/>
                <FormInput title="Passwort wiederholen" placeholder="Passwort"/>
            </div>
        </div>
    </div>
</template> -->

<style scoped>
.form-background {
    padding: 20px 40px;
    margin: 10px 40px;
    border-radius: 25px;
    background-color: var(--color-auth);
}

.form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 40px 0;
}
</style>
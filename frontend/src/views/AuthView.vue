<script setup>
import PageTitleContainer from '@/components/Basic/PageTitleContainer.vue';
import SignUpForm from '@/components/AuthView/AuthForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authType = route.params.type;
</script>

<template>
    <PageTitleContainer :title="authType === 'signup' ? 'Registrierung' : 'Login'"/>
    <div class="content-container">
        <SignUpForm :type="authType"/>
    </div>
</template>


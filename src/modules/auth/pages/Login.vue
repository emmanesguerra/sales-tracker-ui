<!-- src/modules/auth/pages/Login.vue -->
<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="login-card" elevation="20" width="400">
            <v-card-title class="text-center">Welcome</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field v-model="email" label="Email" type="email" required class="email-field"
                        :error="!!errorMessage"></v-text-field>

                    <v-text-field v-model="password" label="Password" type="password" required class="password-field"
                        :error="!!errorMessage"></v-text-field>

                    <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

                    <v-btn type="submit" color="primary" block :loading="loading">Login</v-btn>
                </v-form>

                <v-row class="mt-3">
                    <v-col class="text-center">
                        <span>Don't have an account?</span>
                        <router-link :to="{ name: 'Register' }">Sign up</router-link>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/modules/auth/services/authService';
import { useAuthStore } from '@/modules/auth/store/authStore';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        const data = await authService.login(email.value, password.value);

        // Redirect to dashboard after login
        window.location.href = `http://${data.tenant_domain}.${import.meta.env.VITE_APP_DOMAIN}/dashboard`;
    } catch (error) {
        errorMessage.value = 'Invalid email or password';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (authStore.token) {
        authStore.clearToken()
    }
});
</script>

<style scoped>
.login-card {
    border: 1px solid var(--vt-c-indigo);
    padding: 2rem 2rem 3.5rem;
}
</style>
<!-- src/modules/auth/pages/Login.vue -->
<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="login-card" elevation="20" width="400">
            <v-card-title class="text-center">Welcome</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field v-model="email" label="Email" type="email" required
                        :error="!!errorMessage"></v-text-field>

                    <v-text-field v-model="password" label="Password" type="password" required
                        :error="!!errorMessage"></v-text-field>

                    <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

                    <v-btn type="submit" color="primary" block :loading="loading">Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/modules/auth/services/authService';
import { useAuthStore } from '@/modules/auth/store/authStore';

const email = ref('john@example.com');
const password = ref('secret');
const loading = ref(false);
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        const data = await authService.login(email.value, password.value);

        // Store token in Pinia and localStorage
        authStore.setToken(data.token);

        // Redirect to dashboard after login
        router.push({ name: 'Dashboard' });
    } catch (error) {
        errorMessage.value = 'Invalid email or password';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-card {
    border: 1px solid var(--vt-c-indigo);
    padding: 2rem 2rem 3.5rem;
}
</style>
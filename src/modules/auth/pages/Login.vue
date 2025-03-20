<!-- src/modules/auth/views/Login.vue -->
<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="login-card" elevation="20" width="400">
            <v-card-title class="text-center">Welcome</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                    <v-btn type="submit" block>Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '@/modules/auth/services/authService';
import { useAuthStore } from '@/modules/auth/store/authStore';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const data = await authService.login(email.value, password.value);
    authStore.setToken(data.token);
    console.log('Login successful:', data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped>
.login-card {
    border: 1px solid var(--vt-c-indigo);
    padding:  2rem 2rem 3rem;
}   
.login-card button {
    background: var(--vt-c-indigo);
    color: #fff;
}
</style>
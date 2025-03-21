// src/modules/auth/store/authStore
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('auth_token');
    },
  },
  persist: true,
});

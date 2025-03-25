// src/core/services/apiService.ts
import { useAuthStore } from '@/modules/auth/store/authStore'

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const authStore = useAuthStore()
    const API_URL = `http://${authStore.subdomain}.${import.meta.env.VITE_API_DOMAIN}/api`

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
        Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
    }

    return await response.json()
}

export { apiRequest }

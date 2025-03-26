// src/core/services/apiService.ts
import { useAuthStore } from '@/modules/auth/store/authStore'

const apiRequest = async (endpoint: string, options: RequestInit = {}, responseType: 'json' | 'blob' = 'json') => {
    const authStore = useAuthStore()
    let API_URL = `http://${import.meta.env.VITE_API_DOMAIN}/api`
    if (authStore.subdomain) {
        API_URL = `http://${authStore.subdomain}.${import.meta.env.VITE_API_DOMAIN}/api`    
    }

    const headers: { [key: string]: string } = {
        'Accept': responseType === 'blob' ? 'application/pdf' : 'application/json',
        ...(options.headers as { [key: string]: string }),
        Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
    }

    
    if (options.body) {
        if (options.body instanceof FormData) {
            // If the body is FormData (e.g., file upload), don't set a Content-Type header
            // The browser will automatically handle it.
        } else if (options.body instanceof Blob) {
            // If it's a Blob (e.g., CSV file), set the Content-Type to application/csv
            headers['Content-Type'] = 'application/csv'
        } else {
            // Otherwise, assume JSON
            headers['Content-Type'] = 'application/json'
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
    }

    if(responseType === 'blob') {
        return await response.blob()
    }
    return await response.json()
}

export { apiRequest }

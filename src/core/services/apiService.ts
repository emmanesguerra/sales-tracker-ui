// src/core/services/apiService.ts
const API_URL = import.meta.env.VITE_API_URL

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
    }

    return await response.json()
}

export { apiRequest }

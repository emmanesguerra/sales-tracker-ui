import { describe, it, expect, vi } from 'vitest'
import { apiRequest } from '@/core/services/apiService'
import { useAuthStore } from '@/modules/auth/store/authStore'

// Mock environment variable
vi.stubGlobal('import.meta', { env: { VITE_API_URL: 'https://mocked-api.example.com' } })

// Mock `useAuthStore`
vi.mock('@/modules/auth/store/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('apiRequest', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.restoreAllMocks()
  })

  it('sends request with correct headers and method', async () => {
    // Mock authStore token
    useAuthStore.mockReturnValue({ token: 'fake-token' })

    // Mock fetch response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Success' }),
    })

    const result = await apiRequest('/test', { method: 'POST' })

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer fake-token',
      },
    })
    expect(result).toEqual({ message: 'Success' })
  })

  it('handles API errors correctly', async () => {
    useAuthStore.mockReturnValue({ token: 'fake-token' })

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
    })

    await expect(apiRequest('/test')).rejects.toThrow('API request failed: Unauthorized')
  })
})

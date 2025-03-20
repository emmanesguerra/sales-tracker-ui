import { apiRequest } from '@/core/services/apiService'

const AuthService = {
  async login(email: string, password: string) {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async getUserData(token: string) {
    return apiRequest('/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default AuthService

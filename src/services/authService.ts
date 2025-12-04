import api from '@/services/api'

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post('/auth/login', { email, password })

    return response.data.token
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export async function refreshToken(oldToken: string) {
  try {
    const response = await api.post('/auth/refresh', { token: oldToken })

    return response.data.token
  } catch (error) {
    console.error('Refresh token failed:', error)
    throw error
  }
}

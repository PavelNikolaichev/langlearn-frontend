import api from '@/services/api'

export async function loginUser(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password })

  console.log('Login response:', response.data)

  return response.data.token
}

import axios from 'axios'
import { useAuthStore } from '@/features/auth/stores/auth'
import { LangLearnBackendApi } from '@/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const apiClient = new LangLearnBackendApi(undefined, '', api)

export default api

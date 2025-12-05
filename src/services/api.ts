import axios from 'axios'
import { useAuthStore } from '@/features/auth/stores/auth'
import { LangLearnBackendApi } from '@/api'

// Allow runtime override (e.g. injected at container startup via env file / script)
declare global {
  interface Window {
    __RUNTIME__?: Record<string, any>
  }
}

const runtimeApiBase = (typeof window !== 'undefined' && window.__RUNTIME__?.VITE_API_BASE_URL) || ''
const buildApiBase = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  // Prefer a runtime override, then build-time Vite variable, then empty string
  baseURL: runtimeApiBase || buildApiBase || '',
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

import axios from 'axios'

// Create and configure the Axios instance
const api = axios.create({
  // Base URL for API requests, can be configured via environment variable
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api

import { defineStore } from 'pinia'
import { loginUser } from '@/services/authService'
import { decodeJwt } from '@/utils/jwt'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; email: string },
    token: localStorage.getItem('token') || (null as null | string),
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      const token = await loginUser(email, password)
      this.token = token
      localStorage.setItem('token', token)
      this.user = decodeJwt(token)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    init() {
      if (this.token && !this.user) {
        this.user = decodeJwt(this.token)
      }
    },
  },
})

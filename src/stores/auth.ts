import { defineStore } from 'pinia'
import { loginUser } from '@/services/authService'
import { decodeJwt, isJwtExpired } from '@/utils/jwt'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; email: string },
    exp: null as null | number,
    token: localStorage.getItem('token') || (null as null | string),
  }),

  getters: {
    isLoggedIn: (state) => {
      if (!state.token) return false
      return !isJwtExpired(state.token)
    },
  },

  actions: {
    async login(email: string, password: string) {
      const token = await loginUser(email, password)

      const {
        sub: userId,
        email: userEmail,
        exp,
      } = decodeJwt(token) as {
        sub: string
        email: string
        exp: number
      }

      if (!userId || !userEmail || !exp) {
        throw new Error('Invalid token structure')
      }

      this.user = { id: userId, email: userEmail }
      this.exp = exp

      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.token = null
      this.user = null
      this.exp = null
      localStorage.removeItem('token')
    },

    // TODO: add refresh token
    init() {
      if (this.token) {
        if (isJwtExpired(this.token)) {
          this.logout()
        } else if (!this.user) {
          this.user = decodeJwt(this.token)
        }
      }
    },
  },
})

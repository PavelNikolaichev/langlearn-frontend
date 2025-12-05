import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import { decodeJwt, isJwtExpired, type JwtPayload } from '@/utils/jwt'

export const useAuthStore = defineStore('auth', {
  state: () => {
    // Read token from localStorage (persistent) first, then from sessionStorage (non-persistent)
    const tokenFromLocal = localStorage.getItem('token')
    const tokenFromSession = sessionStorage.getItem('token')
    const token = tokenFromLocal || tokenFromSession || (null as null | string)
    const jwtPayload: JwtPayload | null = token ? decodeJwt(token) : null
    const remember = !!tokenFromLocal
    return {
      token,
      jwtPayload,
      // whether the token is stored persistently in localStorage
      remember,
    }
  },

  getters: {
    isLoggedIn: (state) => {
      if (!state.token) return false
      return !isJwtExpired(state.token)
    },
    getUserId: (state) => state.jwtPayload?.sub || null,
    getUserEmail: (state) => state.jwtPayload?.email || null,
    getUserEmailStripped: (state) => {
      const email = typeof state.jwtPayload?.email === 'string' ? state.jwtPayload.email : null
      return email ? email.split('@')[0] : null
    },
    exp: (state) => state.jwtPayload?.exp || null,
    user: (state) =>
      state.jwtPayload ? { sub: state.jwtPayload.sub, email: state.jwtPayload.email } : null,
  },

  actions: {
    async login(email: string, password: string, remember = false) {
      const response = await apiClient.authLoginPost({ loginRequestDto: { email, password } })
      const token = response.data.token

      if (!token) {
        throw new Error('Failed to retrieve token')
      }

      const jwtPayload = decodeJwt(token)
      if (!jwtPayload?.sub || !jwtPayload?.email || !jwtPayload?.exp) {
        throw new Error('Invalid token structure')
      }

      this.token = token
      this.jwtPayload = jwtPayload
      this.remember = !!remember
      if (this.remember) {
        localStorage.setItem('token', token)
        sessionStorage.removeItem('token')
      } else {
        sessionStorage.setItem('token', token)
        localStorage.removeItem('token')
      }
    },

    logout() {
      this.token = null
      this.jwtPayload = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      this.remember = false
    },

    async refreshToken() {
      if (!this.token) {
        throw new Error('No token to refresh')
      }

      try {
        const response = await apiClient.authRefreshPost({
          refreshTokenRequestDto: { token: this.token },
        })
        const newToken = response.data.token

        if (!newToken) {
          throw new Error('Failed to retrieve new token')
        }

        const jwtPayload = decodeJwt(newToken)
        if (!jwtPayload?.sub || !jwtPayload?.email || !jwtPayload?.exp) {
          throw new Error('Invalid token structure')
        }

        this.token = newToken
        this.jwtPayload = jwtPayload
        // keep same storage that we used for the current token
        if (this.remember) {
          localStorage.setItem('token', newToken)
        } else {
          sessionStorage.setItem('token', newToken)
        }
      } catch (error) {
        console.error('Failed to refresh token:', error)
        this.logout()
        throw error
      }
    },

    init() {
      if (this.token) {
        if (isJwtExpired(this.token)) {
          this.refreshToken().catch(() => {
            this.logout()
          })
        } else if (!this.jwtPayload) {
          console.log('Decoding token to initialize jwtPayload')
          this.jwtPayload = decodeJwt(this.token)
          // ensure remember flag is set based on storage
          this.remember = !!localStorage.getItem('token')
        }
      }
    },
  },
})

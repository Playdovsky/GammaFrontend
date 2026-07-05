import { defineStore } from 'pinia'
import apiClient from '@/services/api'

export interface User {
  username: string
}

export interface LoginCredentials {
  username: string
  password: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    accessToken: null // Stored in memory only
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const response = await apiClient.post('/auth', credentials)
        const data = response.data
        this.user = data.user
        this.isAuthenticated = true
        this.accessToken = data.accessToken
      } catch (error: unknown) {
        this.logout()
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { data?: { detail?: string } } }
          throw new Error(axiosError.response?.data?.detail || 'Login failed')
        }
        throw new Error('Login failed')
      }
    },

    async logout() {
      try {
        await apiClient.post('/logout')
      } catch (error) {
        console.error('[Error] Logout failed', error)
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.accessToken = null
      }
    },

    async refreshToken() {
      try {
        const response = await apiClient.post('/refresh')
        this.accessToken = response.data.accessToken
        this.isAuthenticated = true
        return true
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        this.accessToken = null
        return false
      }
    }
  }
})

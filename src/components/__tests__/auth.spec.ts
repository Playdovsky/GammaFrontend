import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/services/api'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
        interceptors: {
            request: { use: vi.fn() },
            response: { use: vi.fn() }
        }
    }
}))

describe('AuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('sets user and token on successful login', async () => {
        vi.mocked(apiClient.post).mockResolvedValue({
            data: {
                user: { username: 'Martin' },
                accessToken: 'DbI305ua19'
            }
        })

        const store = useAuthStore()

        await store.login({ username: 'Martin', password: 'DeltaOps/33rd' })

        expect(store.isAuthenticated).toBe(true)
        expect(store.user?.username).toBe('Martin')
        expect(store.accessToken).toBe('DbI305ua19')
    })
    it('fails login on invalid credentials', async () => {
        vi.mocked(apiClient.post).mockRejectedValue({ response: { data: { detail: 'Invalid credentials' } } })

        const store = useAuthStore()

        await expect(store.login({ username: 'John', password: 'K0rw1n'})).rejects.toThrow('Invalid credentials')

        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
        expect(store.accessToken).toBeNull()
    })
    it('clears user and token on logout', async () => {
        vi.mocked(apiClient.post).mockResolvedValue({ data: {} })

        const store = useAuthStore()

        store.user = { username: 'Max'}
        store.isAuthenticated = true
        store.accessToken = '!jureK8s!'

        expect(store.isAuthenticated).toBe(true)

        await store.logout()

        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
        expect(store.accessToken).toBeNull()
    })
    it('refreshes token upon its expiration', async () => {
        vi.mocked(apiClient.post).mockResolvedValue({ 
            data: { accessToken: 'vorS1Lvp%y!oZ' } 
        })

        const store = useAuthStore()

        const result = await store.refreshToken()

        expect(result).toBe(true)
        expect(store.accessToken).toBe('vorS1Lvp%y!oZ')
        expect(store.isAuthenticated).toBe(true)
    })
    it('Fails to refresh token after session expiration', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Session expired'))

        const store = useAuthStore()
        
        store.user = { username: 'Milan' }
        store.isAuthenticated = true
        store.accessToken = 'inERzoE!R8@K@#2'

        const result = await store.refreshToken()

        expect(result).toBe(false)
        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
        expect(store.accessToken).toBeNull()
    })
})
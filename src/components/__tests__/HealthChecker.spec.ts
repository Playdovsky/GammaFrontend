import { mount } from '@vue/test-utils'
import HealthChecker from '../HealthChecker.vue'
import { describe, it, expect, vi } from 'vitest'
import apiClient from '@/services/api'

vi.mock('@/services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        interceptors: {
            request: { use: vi.fn() },
            response: { use: vi.fn() }
        }
    }
}))

describe('HealthChecker', () =>{
    it('shows healthy message when backend responds', async () => {
        vi.mocked(apiClient.get).mockResolvedValue({
            data: {message: 'OK'}
        })
        
        const wrapper = mount(HealthChecker)
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Backend is healthy')
    })
    it('shows error message when backend fails to respond', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))

        const wrapper = mount(HealthChecker)
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Backend is not healthy')
    })
})
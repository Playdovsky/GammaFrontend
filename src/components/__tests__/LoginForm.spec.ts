import { mount } from '@vue/test-utils'
import LoginForm from '../LoginForm.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth'

const mockRouter = {
    push: vi.fn()
}

const mockLogin = vi.fn()

vi.mock('@/stores/auth', () => ({
    useAuthStore: vi.fn()
}))

vi.mock('vue-router', () => ({
    useRouter: () => mockRouter
}))

describe('LoginForm', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
        mockLogin.mockReset()
        mockRouter.push.mockReset()

        vi.mocked(useAuthStore).mockReturnValue({
            login: mockLogin,
            isAuthenticated: false,
        } as unknown as ReturnType<typeof useAuthStore>)
    })

    it('navigates to dashboard on successful login', async () => {
        mockLogin.mockResolvedValue(undefined)

        wrapper = mount(LoginForm)
        await wrapper.find('#username').setValue('David')
        await wrapper.find('#password').setValue('Nimbostratus3!')
        await wrapper.find('form').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })

    it('shows error message when login fails', async () => {
        mockLogin.mockRejectedValue(new Error('Invalid'))

        wrapper = mount(LoginForm)
        await wrapper.find('#username').setValue('Joshua')
        await wrapper.find('#password').setValue('Mercy&Wrath7')
        await wrapper.find('form').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Authentication failed')
    })
})
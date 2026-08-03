import { mount } from '@vue/test-utils'
import ContactForm from '../ContactForm.vue'
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

describe('ContactForm', () =>{
    it('sends message with correct format', async () => {
        vi.mocked(apiClient.post).mockResolvedValue({ data: 'OK' })
        
        const wrapper = mount(ContactForm)
        await wrapper.find('#name').setValue('Richard')
        await wrapper.find('#email').setValue('rich_richard@protonmail.com')
        await wrapper.find('#message').setValue('This is a test message from Richard!')
        await wrapper.find('button').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(apiClient.post).toHaveBeenCalledWith('/contact', {
            name: 'Richard',
            email: 'rich_richard@protonmail.com',
            message: 'This is a test message from Richard!'
        })

        expect(wrapper.find("#success-message").text()).toContain('Message sent successfully')
    })
    it('shows error message when API call fails', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Bad request'))
        
        const wrapper = mount(ContactForm)
        await wrapper.find('#name').setValue('     ')
        await wrapper.find('#email').setValue('rich_richard@protonmail.com')
        await wrapper.find('#message').setValue('This is a test message from Richard!')
        await wrapper.find('button').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(apiClient.post).toHaveBeenCalled()

        expect(wrapper.find("#failed-message").text()).toContain('Failed to send a message')
    })
    it('resets success and failed states before each submission', async () => {
        vi.mocked(apiClient.post).mockResolvedValue({ data: 'OK' })
        
        const wrapper = mount(ContactForm)
        await wrapper.find('#name').setValue('John')
        await wrapper.find('#email').setValue('john_john.john@gmail.com')
        await wrapper.find('#message').setValue('I am the John from Johns dynasty!')
        await wrapper.find('button').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(wrapper.find("#success-message").text()).toContain('Message sent successfully')

        vi.mocked(apiClient.post).mockRejectedValue(new Error('Bad request'))
        
        await wrapper.find('#name').setValue('Tamara')
        await wrapper.find('#email').setValue('tamara@whatever')
        await wrapper.find('#message').setValue('Hi, my name is Tamara. Nice to meet you!')
        await wrapper.find('button').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        expect(wrapper.find("#success-message").exists()).toBe(false)
        expect(wrapper.find("#failed-message").text()).toContain('Failed to send a message')
        expect(apiClient.post).toHaveBeenCalled()
    })
})
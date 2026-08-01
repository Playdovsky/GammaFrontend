import { mount, flushPromises } from '@vue/test-utils'
import UserDashboard from '../UserDashboard.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '@/services/api'

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

const mockMessages = [
    { id: 1, name: 'Peter', email: 'peter_parsley1@o2.pl', message: 'There was an incident in Kassel.', published: '2026-07-31T13:22:06', archived: false },
    { id: 2, name: 'Igor', email: 'soldier517@onet.eu', message: 'I like your website.', published: '2026-08-01T12:12:48', archived: false },
]

describe('UserDashboard', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockMessages })
    })

    it('shows message list', async () => {
        wrapper = mount(UserDashboard)
        await flushPromises()

        expect(wrapper.findAll('.message-box')).toHaveLength(2)
        expect(wrapper.text()).toContain('peter_parsley1@o2.pl')
        expect(wrapper.text()).toContain('soldier517@onet.eu')
    })
    it('shows message details on click', async () => {
        wrapper = mount(UserDashboard)
        await flushPromises()

        const messageBoxes = wrapper.findAll('.message-box')
        await messageBoxes[0]?.find('.message-header').trigger('click')
        
        expect(wrapper.text()).toContain('Kassel')
    })
    it('archives message on click', async () => {
        wrapper = mount(UserDashboard)
        vi.mocked(apiClient.patch).mockResolvedValue({ data: {} })
        await flushPromises()
        
        const messageBoxes = wrapper.findAll('.message-box')
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        await messageBoxes[1]?.find('.message-header').trigger('click')
        await wrapper.find('.archive-btn').trigger('click')
        await flushPromises()
        
        expect(apiClient.patch).toHaveBeenCalledWith('/messages/2')
        expect(wrapper.findAll('.message-box')).toHaveLength(1)
        expect(wrapper.text()).not.toContain('Igor')
    })
    it('deletes message on click', async () => {
        wrapper = mount(UserDashboard)
        vi.mocked(apiClient.delete).mockResolvedValue({ data: {} })
        await flushPromises()

        const messageBoxes = wrapper.findAll('.message-box')
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        await messageBoxes[0]?.find('.message-header').trigger('click')
        await wrapper.find('.delete-btn').trigger('click')
        await flushPromises()
        
        expect(apiClient.delete).toHaveBeenCalledWith('/messages/1')
        expect(wrapper.findAll('.message-box')).toHaveLength(1)
        expect(wrapper.text()).not.toContain('Peter')
    })
})
import apiClient from './api'

export default {
    async sendContactForm(userData){
        return apiClient.post('/contact', userData);
    }
}
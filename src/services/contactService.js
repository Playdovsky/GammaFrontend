import apiClient from './api'

export default {
    async sendContactForm(userData){
        console.log('[INFO]', userData);
        return apiClient.post('/contact', userData);
    }
}
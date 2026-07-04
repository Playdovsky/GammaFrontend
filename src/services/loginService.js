import apiClient from './api'

export default {
    async login(userData){
        return apiClient.post('/login', userData);
    }
}
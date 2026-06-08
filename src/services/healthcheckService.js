import apiClient from './api'

export default {
    get healthStatus(){
        return apiClient.get('/healthcheck');
    }
}
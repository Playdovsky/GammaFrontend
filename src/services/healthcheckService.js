import apiClient from './api'

export default {
    get healthStatus(){
        console.log('[INFO] Healthcheck');
        return apiClient.get('/healthcheck');
    }
}
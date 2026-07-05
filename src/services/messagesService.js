import apiClient from './api'

export default{
    get messages(){
        console.log('[INFO] Fetching messages');
        return apiClient.get('/messages');
    }
}
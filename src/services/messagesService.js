import apiClient from './api'

export default{
    get messages(){
        console.log('[INFO] Fetching messages');
        return apiClient.get('/messages');
    },
    async deleteMessage(messageId){
        console.log('[INFO]', messageId);
        return apiClient.delete(`/messages/${messageId}`);
    }
}
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        console.log('Authorization header set:', config.headers.Authorization);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            if (originalRequest.url && (originalRequest.url === '/refresh' || originalRequest.url.includes('refresh'))) {
                return Promise.reject(error);
            }
            
            const authStore = useAuthStore();
            const success = await authStore.refreshToken();
            if (success) {
                originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;
                return apiClient(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

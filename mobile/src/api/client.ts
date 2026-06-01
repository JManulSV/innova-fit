import {create} from 'axios'
import { useAuthStore } from '../store/authStore';

export const api = create({
  baseURL: 'http://192.168.3.159:8000/api',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
)
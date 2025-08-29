import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import API_CONFIG from '../config/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Don't add auth header for login endpoint
    if (!config.url.includes('auth/login')) {
      const token = await SecureStore.getItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    // If new access token is in response headers, save it
    const newAccessToken = response.headers['authorization'];
    if (newAccessToken) {
      SecureStore.setItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN, newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired and we have a refresh token, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = await SecureStore.getItemAsync(API_CONFIG.TOKEN_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          // Add refresh token header and retry
          originalRequest.headers['X-Refresh-Token'] = refreshToken;
          const response = await apiClient(originalRequest);
          
          // Save new access token if provided
          const newAccessToken = response.headers['authorization'];
          if (newAccessToken) {
            await SecureStore.setItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN, newAccessToken);
          }
          
          return response;
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          await SecureStore.deleteItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN);
          await SecureStore.deleteItemAsync(API_CONFIG.TOKEN_KEYS.REFRESH_TOKEN);
          // Will be handled by auth service
          throw refreshError;
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
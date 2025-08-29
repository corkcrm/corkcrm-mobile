// API Configuration
import { Platform } from 'react-native';

const API_CONFIG = {
  // For local development with Rails running on localhost:3000
  // iOS Simulator can use localhost, physical devices need IP address
  BASE_URL: Platform.select({
    ios: 'http://localhost:3000',     // iOS simulator
    android: 'http://10.0.2.2:3000',  // Android emulator
    web: '',                           // Web browser - use relative URLs for proxy
    default: 'http://localhost:3000',
  }),
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/api/v1/mobile/auth/login',
    LOGOUT: '/api/v1/mobile/auth/logout',
    REFRESH: '/api/v1/mobile/auth/refresh',
    PROFILE: '/api/v1/mobile/user/profile',
  },
  
  // Token configuration
  TOKEN_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
  },
  
  // Request timeout
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
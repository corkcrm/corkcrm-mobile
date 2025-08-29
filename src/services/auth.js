import * as SecureStore from 'expo-secure-store';
import apiClient from './api';
import API_CONFIG from '../config/api';

class AuthService {
  constructor() {
    this.user = null;
  }

  // Login method
  async login(email, password, deviceInfo = {}) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password,
        device_type: deviceInfo.deviceType || 'iOS',
        device_os: deviceInfo.deviceOS || '17.0',
      });

      const { access_token, refresh_token, user } = response.data;

      // Store tokens securely
      await SecureStore.setItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN, access_token);
      await SecureStore.setItemAsync(API_CONFIG.TOKEN_KEYS.REFRESH_TOKEN, refresh_token);

      // Store user data
      this.user = user;

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Login failed',
      };
    }
  }

  // Logout method
  async logout() {
    try {
      // Call logout endpoint
      await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API call result
      await this.clearTokens();
      this.user = null;
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PROFILE);
      this.user = response.data.user;
      return {
        success: true,
        user: response.data.user,
        organization: response.data.organization,
      };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to get profile',
      };
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    const token = await SecureStore.getItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN);
    return !!token;
  }

  // Get stored tokens
  async getTokens() {
    const accessToken = await SecureStore.getItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN);
    const refreshToken = await SecureStore.getItemAsync(API_CONFIG.TOKEN_KEYS.REFRESH_TOKEN);
    return { accessToken, refreshToken };
  }

  // Clear tokens
  async clearTokens() {
    await SecureStore.deleteItemAsync(API_CONFIG.TOKEN_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(API_CONFIG.TOKEN_KEYS.REFRESH_TOKEN);
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }
}

// Export singleton instance
export default new AuthService();
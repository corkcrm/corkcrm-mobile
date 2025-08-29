import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cross-platform storage service
 * Uses SecureStore on mobile (iOS/Android) for secure storage
 * Falls back to AsyncStorage on web
 */
class StorageService {
  isWeb = Platform.OS === 'web';

  async setItem(key, value) {
    if (this.isWeb) {
      // Use AsyncStorage for web
      return await AsyncStorage.setItem(key, value);
    } else {
      // Use SecureStore for mobile
      return await SecureStore.setItemAsync(key, value);
    }
  }

  async getItem(key) {
    if (this.isWeb) {
      // Use AsyncStorage for web
      return await AsyncStorage.getItem(key);
    } else {
      // Use SecureStore for mobile
      return await SecureStore.getItemAsync(key);
    }
  }

  async removeItem(key) {
    if (this.isWeb) {
      // Use AsyncStorage for web
      return await AsyncStorage.removeItem(key);
    } else {
      // Use SecureStore for mobile
      return await SecureStore.deleteItemAsync(key);
    }
  }

  async clear() {
    if (this.isWeb) {
      // Clear all AsyncStorage
      return await AsyncStorage.clear();
    } else {
      // SecureStore doesn't have a clear method, so we'd need to remove items individually
      // This would require tracking all keys
      console.warn('SecureStore does not support clear() - remove items individually');
    }
  }
}

export default new StorageService();
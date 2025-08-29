import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import storage from '../services/storage';
import { lightTheme, darkTheme } from '../config/theme';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@corkcrm:theme_preference';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themePreference, setThemePreference] = useState('system'); // 'light', 'dark', 'system'
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme when preference or system theme changes
  useEffect(() => {
    if (themePreference === 'system') {
      setIsDarkMode(systemColorScheme === 'dark');
    } else {
      setIsDarkMode(themePreference === 'dark');
    }
  }, [themePreference, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedPreference = await storage.getItem(THEME_STORAGE_KEY);
      if (savedPreference) {
        setThemePreference(savedPreference);
      } else {
        // Default to dark mode
        setThemePreference('dark');
        await storage.setItem(THEME_STORAGE_KEY, 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      // Default to dark mode on error
      setThemePreference('dark');
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (preference) => {
    try {
      await storage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreference(preference);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newPreference = isDarkMode ? 'light' : 'dark';
    saveThemePreference(newPreference);
  };

  const setTheme = (preference) => {
    saveThemePreference(preference);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    theme,
    isDarkMode,
    themePreference,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
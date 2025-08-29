import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';

// CorkCRM Brand Colors
const brandColors = {
  primary: '#2563eb', // Blue
  secondary: '#10b981', // Green
  error: '#ef4444', // Red
  warning: '#f59e0b', // Amber
  info: '#3b82f6', // Light Blue
  success: '#10b981', // Green
};

// Custom font configuration
const fontConfig = {
  displayLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 45,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

const fonts = configureFonts({ config: fontConfig });

// Light Theme
export const lightTheme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: brandColors.primary,
    primaryContainer: '#dbeafe',
    secondary: brandColors.secondary,
    secondaryContainer: '#d1fae5',
    tertiary: '#7c3aed',
    tertiaryContainer: '#ede9fe',
    error: brandColors.error,
    errorContainer: '#fee2e2',
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceVariant: '#f3f4f6',
    surfaceDisabled: '#e5e7eb',
    onSurface: '#111827',
    onSurfaceVariant: '#4b5563',
    onSurfaceDisabled: '#9ca3af',
    outline: '#d1d5db',
    outlineVariant: '#e5e7eb',
    inverseSurface: '#1f2937',
    inverseOnSurface: '#f9fafb',
    inversePrimary: '#60a5fa',
    elevation: {
      level0: 'transparent',
      level1: '#ffffff',
      level2: '#f9fafb',
      level3: '#f3f4f6',
      level4: '#e5e7eb',
      level5: '#d1d5db',
    },
  },
  roundness: 8,
};

// Dark Theme
export const darkTheme = {
  ...MD3DarkTheme,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brandColors.primary,
    primaryContainer: '#1e3a8a',
    secondary: brandColors.secondary,
    secondaryContainer: '#064e3b',
    tertiary: '#a78bfa',
    tertiaryContainer: '#5b21b6',
    error: brandColors.error,
    errorContainer: '#7f1d1d',
    background: '#111827',
    surface: '#1f2937',
    surfaceVariant: '#374151',
    surfaceDisabled: '#4b5563',
    onSurface: '#f9fafb',
    onSurfaceVariant: '#d1d5db',
    onSurfaceDisabled: '#9ca3af',
    outline: '#6b7280',
    outlineVariant: '#4b5563',
    inverseSurface: '#f3f4f6',
    inverseOnSurface: '#111827',
    inversePrimary: '#1e40af',
    elevation: {
      level0: 'transparent',
      level1: '#1f2937',
      level2: '#374151',
      level3: '#4b5563',
      level4: '#6b7280',
      level5: '#9ca3af',
    },
  },
  roundness: 8,
};

// Export brand colors for use in components
export { brandColors };
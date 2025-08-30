# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
- **Project Name**: CorkCRM Mobile
- **Framework**: React Native with Expo
- **Platform**: iOS and Android
- **Backend API**: Rails API at `corkcrm-upgraded` repository
- **Authentication**: JWT-based with secure token storage
- **Development Branch**: main

## Development Setup

### Prerequisites
- Node.js and npm
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Rails API server running locally

### Installation
```bash
# Install dependencies
npm install

# Start for iOS
npm run ios

# Start for Android  
npm run android

# Start for Web
npm run web

# Start Expo development server
npm start
```

## Project Structure

### Directories
- **src/config/** - API configuration and constants
- **src/screens/** - React Native screen components
- **src/services/** - API services and authentication
- **src/components/** - Reusable UI components (to be created)

### Key Files
- **src/config/api.js** - API endpoints and configuration
- **src/services/auth.js** - Authentication service
- **src/services/api.js** - Axios API client with interceptors
- **src/screens/LoginScreen.js** - Login UI
- **src/screens/HomeScreen.js** - Home/Profile UI

## API Configuration

### Endpoints
The app connects to Rails API endpoints:
- **Login**: `POST /api/v1/mobile/auth/login`
- **Logout**: `POST /api/v1/mobile/auth/logout`
- **Profile**: `GET /api/v1/mobile/user/profile`
- **Refresh**: `POST /api/v1/mobile/auth/refresh`

### Platform-Specific URLs
```javascript
// Automatically configured in src/config/api.js
iOS Simulator: http://localhost:3000
Android Emulator: http://10.0.2.2:3000
Physical Device: Use computer's IP address
```

## Authentication System

### Token Management
- **Access Token**: 5-minute expiry
- **Refresh Token**: 90-day expiry (mobile-specific)
- **Storage**: expo-secure-store for secure token storage
- **Auto-refresh**: Automatic token refresh on 401 responses

### Test Credentials
```
Email: owner-user@dev-org.com
Password: dev-org-owner@123
```

## Testing Commands

### Running Tests
```bash
# No test framework is currently configured
# Tests will need to be set up with Jest or another testing framework
```

### Linting and Type Checking
```bash
# No linting or type checking tools are currently configured
# Consider adding ESLint and/or TypeScript
```

### Platform-Specific Testing
```bash
# iOS Simulator
npx expo run:ios --simulator="iPhone 16 Pro"

# Android Emulator
npm run android

# Physical Device via Expo Go
npm start  # Then scan QR code
```

## Key Technologies

### Core Dependencies
- **react-native**: 0.79.6
- **expo**: ~53.0.0
- **expo-secure-store**: Token storage
- **axios**: HTTP client
- **react-native-safe-area-context**: Safe area handling

### Development Tools
- **Metro Bundler**: JavaScript bundler
- **Expo Go**: Development client
- **React DevTools**: Debugging

## Common Tasks

### Add New Screen
```bash
# Create new screen file
touch src/screens/NewScreen.js

# Import in App.js navigation
```

### Add API Endpoint
1. Add endpoint to `src/config/api.js`
2. Create service method in appropriate service file
3. Use in screen component

### Handle Errors
- API errors are handled in axios interceptors
- Auth errors trigger token refresh or logout
- Network errors show user-friendly messages

## Debugging

### Console Logs
- View in Metro bundler terminal
- Or use React Native Debugger

### Network Requests
- Check Metro terminal for API calls
- Use React Native Debugger network tab

### Common Issues

**API Connection Failed**
- Ensure Rails server is running on port 3000
- Check API URL configuration for your platform
- Verify network connectivity

**Token Expired**
- App automatically refreshes tokens
- If refresh fails, user is logged out

**Build Issues**
```bash
# Clear cache
npx expo start -c

# Reset Metro bundler
rm -rf node_modules/.cache
npm install
```

## Architecture Overview

### Navigation Structure
The app uses a simple conditional rendering pattern for navigation:
- **App.js**: Main entry point that checks authentication state
- **LoginScreen**: Displayed when user is not authenticated
- **HomeScreen**: Displayed when user is authenticated
- No navigation library currently - screens are swapped based on `isAuthenticated` state

### State Management
- **Local Component State**: Using React hooks (useState, useEffect)
- **Theme Context**: Global theme management with dark mode support
- **Auth State**: Managed in App.js with pass-through props
- No global state management library currently integrated

### Service Layer Architecture
- **src/services/api.js**: Axios client with interceptors for token management
- **src/services/auth.js**: Authentication service singleton pattern
- **src/services/storage.js**: Abstraction over expo-secure-store
- Automatic token refresh on 401 responses

### UI Framework
- **React Native Paper**: Material Design components with theming
- **Custom Theme**: Light/dark mode configurations in src/config/theme.js
- **Safe Area**: Handled via react-native-safe-area-context

## Rails Backend Integration

### Backend Repository
- **Location**: /Users/michaelhenry/Projects/corkcrm-upgraded
- **Branch**: master
- **API Namespace**: /api/v1/mobile/*
- **Required**: Rails server must be running on port 3000

### Starting the Rails Backend Server

**IMPORTANT**: DO NOT make any changes to the Rails app code or configuration to get it running. The Rails app is already configured and should run as-is.

#### Prerequisites
- Ruby 2.7.6 (managed via rbenv)
- All gems are already installed in the repository
- Database is already set up and migrated

#### Steps to Start Rails Server
```bash
# 1. Navigate to Rails backend directory
cd /Users/michaelhenry/Projects/corkcrm-upgraded

# 2. Use rbenv with Ruby 2.7.6 (already configured in .ruby-version)
# If rbenv isn't loading automatically, use the full path:
/Users/michaelhenry/.rbenv/shims/bundle exec rails server -p 3000

# Alternative if rbenv is properly configured in your shell:
bundle exec rails server -p 3000
```

#### Verify Rails Server is Running
```bash
# Test the mobile login endpoint
curl -X POST http://localhost:3000/api/v1/mobile/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner-user@dev-org.com","password":"dev-org-owner@123"}'
```

#### Important Notes
- The Rails app uses Rails 5.2.4.5 - DO NOT upgrade Rails version
- The app uses Ruby 2.7.6 - DO NOT change Ruby version
- All dependencies are already installed - DO NOT run `bundle install` or modify Gemfile
- Database is already configured - DO NOT run database setup commands
- Simply start the server with the existing configuration

### Mobile-Specific Endpoints
All mobile endpoints use the `/api/v1/mobile/` prefix and return JWT tokens with extended expiry for mobile devices (90 days for refresh tokens).

## Code Conventions

### Component Structure
- Functional components with hooks
- Screen components in src/screens/
- Reusable components should go in src/components/ (not yet created)
- Services use singleton pattern (see auth.js)

### Error Handling
- API errors handled in axios interceptors
- User-friendly error messages displayed
- Token refresh automatic on 401
- Network errors gracefully handled

### Styling Approach
- React Native Paper components for consistency
- Theme-aware styling using useTheme hook
- StyleSheet.create for performance
- Safe area handling on all screens
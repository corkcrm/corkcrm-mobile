# Claude AI Assistant Configuration - CorkCRM Mobile

This file contains configuration and context for working with Claude AI on the CorkCRM Mobile app.

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

## Testing

### iOS Simulator
```bash
# Run on specific simulator
npx expo run:ios --simulator="iPhone 16 Pro"

# Available simulators
- iPhone 16 Pro
- iPhone 16 Pro Max
- iPad Pro 11-inch
```

### Android Emulator
```bash
npm run android
```

### Physical Device
1. Update `src/config/api.js` with your computer's IP
2. Run `npm start`
3. Scan QR code with Expo Go app

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

## State Management
Currently using React hooks and local state. Consider adding:
- Redux Toolkit for complex state
- React Query for API cache
- Zustand for simple global state

## Planned Features
- [ ] Contacts list and management
- [ ] Jobs/Projects tracking
- [ ] Appointments calendar
- [ ] Proposals viewing
- [ ] Push notifications
- [ ] Offline support
- [ ] Biometric authentication

## Security Considerations
- Tokens stored in secure storage
- API calls use HTTPS in production
- Sensitive data not logged
- Authentication required for all protected routes

## Performance Optimization
- Lazy loading for screens
- Image optimization
- API response caching
- Minimize re-renders

## Deployment

### iOS
1. Configure in Xcode
2. Set bundle identifier
3. Archive and upload to App Store Connect

### Android
1. Configure in Android Studio
2. Generate signed APK/AAB
3. Upload to Google Play Console

## Team Guidelines
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Test on both iOS and Android
- Keep accessibility in mind
- Document new features in this file

## Rails API Integration

### Backend Repository
- **Repo**: corkcrm-upgraded
- **Branch**: master (merged mobile API endpoints)
- **Mobile endpoints**: `/api/v1/mobile/*`

### Required Rails Server
```bash
cd /Users/michaelhenry/Projects/corkcrm-upgraded
rails s -p 3000
```

## Notes for Claude
- This is a React Native mobile app for CorkCRM
- Uses Expo for development and building
- JWT authentication with Rails backend
- Supports iOS and Android platforms
- Focus on user experience and performance
- Maintain consistency with Rails API
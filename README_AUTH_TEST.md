# CorkCRM Mobile App - Authentication Testing

## Current Status
✅ React Native app with Expo initialized
✅ Authentication system implemented
✅ Login screen with test credentials pre-filled
✅ Home screen showing user profile after login
✅ Rails API mobile endpoints working

## Running the App

### Prerequisites
- Rails API server running on http://localhost:3000
- Expo development server

### Start the servers:

1. **Rails API** (already running on port 3000):
```bash
cd /Users/michaelhenry/Projects/corkcrm-upgraded
rails s -p 3000
```

2. **Mobile App** (running on port 8081):
```bash
cd /Users/michaelhenry/Projects/corkcrm-mobile
npm run web
```

## Testing Authentication

### Access the App
Open your browser and navigate to: **http://localhost:8081**

### Test Credentials (Pre-filled)
- **Email**: owner-user@dev-org.com
- **Password**: dev-org-owner@123

### Authentication Flow
1. **Login Screen**: Shows on app launch with pre-filled test credentials
2. **Click "Sign In"**: Authenticates with Rails API at localhost:3000
3. **Success**: Shows home screen with user profile and organization details
4. **Logout**: Click logout button to return to login screen

## Features Implemented

### Authentication Service
- JWT token management with secure storage
- Automatic token refresh on 401 responses
- Login/logout/profile endpoints integration

### API Configuration
- Base URL: http://localhost:3000
- Endpoints:
  - POST /api/v1/mobile/auth/login
  - POST /api/v1/mobile/auth/logout
  - GET /api/v1/mobile/user/profile

### Screens
1. **LoginScreen**: Email/password form with validation
2. **HomeScreen**: User profile, organization info, and features display

### Token Management
- Access tokens (5 min expiry)
- Refresh tokens (90 days expiry for mobile)
- Secure storage using expo-secure-store

## Testing on Physical Device

To test on a physical device (iOS/Android):

1. Update `src/config/api.js`:
   - Replace `localhost` with your computer's IP address
   - Example: `BASE_URL: 'http://192.168.1.100:3000'`

2. Run Expo on device:
```bash
npm start
```

3. Scan QR code with Expo Go app

## Troubleshooting

### CORS Issues
If you encounter CORS errors, the Rails API already has CORS configured for all origins in development.

### Network Errors
- Ensure Rails server is running on port 3000
- Check that both servers are on the same network
- For physical devices, use computer's IP instead of localhost

## Next Steps
- Add more resource endpoints (contacts, jobs, appointments)
- Implement push notifications
- Add biometric authentication
- Create offline support with data sync
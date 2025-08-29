# iOS Simulator Testing Guide

## 🚀 Quick Start

The app is now running on iOS Simulator! Here's how to use it:

### Current Setup
- **iOS Simulator**: iPad Pro 11-inch (M4) - Running
- **Metro Bundler**: Port 8081 - Running
- **Rails API**: Port 3000 - Running
- **App**: Expo Go with CorkCRM Mobile

## 📱 Using the iOS Simulator

### Simulator Controls
- **Home Button**: Cmd + Shift + H
- **Rotate Device**: Cmd + Left/Right Arrow
- **Shake Gesture**: Cmd + Ctrl + Z (opens Dev Menu)
- **Screenshot**: Cmd + S
- **Show/Hide Keyboard**: Cmd + K

### Testing Authentication
1. The app should show the **Login Screen**
2. Test credentials are pre-filled:
   - Email: `owner-user@dev-org.com`
   - Password: `dev-org-owner@123`
3. Tap "Sign In" button
4. You'll see the Home Screen with user profile
5. Tap "Logout" to return to login

## 🔄 Refreshing the App

If you make code changes:
- **Fast Refresh**: Should happen automatically
- **Manual Reload**: Press `r` in the terminal running Metro
- **Dev Menu**: Shake gesture (Cmd + Ctrl + Z) then "Reload"

## 🎯 Switching Simulators

To use a different iPhone model:
```bash
# Kill current process (Ctrl + C)
# Then run with specific simulator:
npx expo run:ios --simulator="iPhone 16 Pro"
```

Available simulators:
- iPhone 16 Pro
- iPhone 16 Pro Max
- iPhone 16
- iPhone 16 Plus

## 🛠 Troubleshooting

### If the simulator doesn't open:
1. Open Xcode manually
2. Go to Xcode → Open Developer Tool → Simulator
3. Then run: `npm run ios`

### If authentication fails:
- Check Rails server is running on port 3000
- Check console logs in Metro bundler terminal
- iOS Simulator uses `localhost:3000` (already configured)

### To see console logs:
- Look at the terminal running `npm run ios`
- Or shake (Cmd + Ctrl + Z) → "Debug Remote JS"

## 📝 Development Tips

### Hot Reloading
- Code changes automatically refresh the app
- If not, press `r` in Metro terminal

### Debugging
1. **Console Logs**: Appear in Metro terminal
2. **Network Requests**: Can be seen in Metro logs
3. **React DevTools**: Shake → "Debug Remote JS"

### API Configuration
The app automatically uses the right URL:
- iOS Simulator: `http://localhost:3000`
- Android Emulator: `http://10.0.2.2:3000`
- Web: `http://localhost:3000`

## 🚀 Next Steps

### For Android Testing:
```bash
npm run android
```
(Requires Android Studio and emulator setup)

### For Physical Device:
1. Update `src/config/api.js` with your computer's IP
2. Connect device to same network
3. Use Expo Go app on your phone
4. Scan QR code from terminal

## 💡 Pro Tips

1. **Multiple Simulators**: You can run multiple iOS simulators simultaneously
2. **Network Throttling**: Device → Network Link Conditioner
3. **Location Simulation**: Features → Location
4. **Accessibility Inspector**: Xcode → Open Developer Tool → Accessibility Inspector

The app is ready for testing on iOS Simulator! Enjoy developing! 🎉
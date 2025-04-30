# SuperMall - React Native E-commerce App

A modern e-commerce mobile application built with React Native, Expo, and Firebase.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For iOS development:
- macOS with Xcode installed
- iOS Simulator

For Android development:
- Android Studio with SDK installed
- Android Emulator

## Setup Instructions

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd SuperMall
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Firebase Configuration
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication service
   - Copy your Firebase configuration from Project Settings
   - Update the configuration in `config/firebase.ts`

4. Start the development server
   ```bash
   npx expo start
   ```

## Running the App

After starting the development server, you can run the app in different environments:

- Press `a` - to open on Android Emulator
- Press `i` - to open on iOS Simulator
- Press `w` - to open in web browser
- Scan QR code with Expo Go app on your physical device

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- 👤 User authentication
- 🌓 Dark/Light theme support
- 💳 Checkout process
- 📱 Responsive design

## Project Structure

```
SuperMall/
├── app/            # Application screens and navigation
├── assets/         # Images, fonts, and animations
├── components/     # Reusable UI components
├── config/         # Configuration files
├── constants/      # Constants and theme colors
├── contexts/       # React Context providers
└── hooks/          # Custom React hooks
```

## Development Guidelines

- All new features should be developed in feature branches
- Follow the existing code style and naming conventions
- Write unit tests for new components
- Use TypeScript for type safety

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Run linter

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
"# supermall_reactnative" 

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
import { getStorage } from 'firebase/storage'; // ← أضف دي

// // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "YOUR_API_KEY",
// //   authDomain: "YOUR_AUTH_DOMAIN",
// //   projectId: "YOUR_PROJECT_ID",
// //   storageBucket: "YOUR_STORAGE_BUCKET",
// //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
// //   appId: "YOUR_APP_ID"
// // };

const firebaseConfig = {
  apiKey: "AIzaSyAg3mV79kZOYINI_OB7wcOGE3ek5QXE0yg",
  authDomain: "cs-303-a525a.firebaseapp.com",
  projectId: "cs-303-a525a",
  storageBucket: "cs-303-a525a.firebasestorage.app",
  messagingSenderId: "625620482602",
  appId: "1:625620482602:web:437c2e4902ea95545d2153"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as FBauth from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_CONFIG_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_CONFIG_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_CONFIG_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_CONFIG_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = FBauth.initializeAuth(app, {
  persistence: (FBauth as any).getReactNativePersistence(
    ReactNativeAsyncStorage
  )
});
const db = getFirestore(app);

export { app, auth, db };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_CONFIG_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_CONFIG_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_CONFIG_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_CONFIG_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

/* 
😀 - happy
🙂 - content
😐 - neutral
🙁 - sad
😢 - upset
😭 - devastated 
*/
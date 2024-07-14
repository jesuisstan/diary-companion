## Place all credential files for platforms into corresponding subfolders.

1. Create file "firebase-config.ts" in [root]/credentials/, paste firebase configuration info to it, export default:

```
const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...'
};

export default firebaseConfig;
```

2. Create corresponding subfolders in the current folder "credentials" for platforms:

- android
- ios
- web

3. Copy "google-services.json" and "keystore.jks" (if applicable) to [root]/credentials/android folder

4. Copy "GoogleService-Info.plist" to [root]/credentials/ios folder

5. Copy any needed credentials to [root]/credentials/web folder

6. Proceed to installation and running the project

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

2. Copy "google-services.json" and "keystore.jks" (if applicable) to [root]/credentials/ folder

3. Copy "GoogleService-Info.plist" to [root]/credentials/ folder

4. Copy any needed credentials to [root]/credentials/ folder

5. Proceed to installation and running the project

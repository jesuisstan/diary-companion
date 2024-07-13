import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar, Text, Button } from 'react-native';

import { C42_GREEN, C42_VIOLET } from '@/style/Colors';
import LoginScreen from '@/components/LoginScreen';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

  const [user, setUser] = useState<{
    displayName: string;
    photoURL: string;
  }>();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Firebase
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyC7wmWxBueAM6PbqaIz7GMr_GeEKCl45d0',
    authDomain: 'diary-companion42.firebaseapp.com',
    projectId: 'diary-companion42',
    storageBucket: 'diary-companion42.appspot.com',
    messagingSenderId: '253645402800',
    appId: '1:253645402800:web:fd11696bf960710d720175'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const db = getFirestore(app);
  console.log('Firebase initialized', app);
  const loggedIn = false; // debug
  //const loggedIn = true; // debug

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      {/* Main Content */}
      {loggedIn ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <LoginScreen user={user} setUser={setUser} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  containerLogin: {
    flex: 1,
    backgroundColor: C42_VIOLET,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RootLayout;

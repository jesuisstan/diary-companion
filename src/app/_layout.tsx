import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar } from 'react-native';

import { C42_GREEN } from '@/style/Colors';
import LoginScreen from '@/components/LoginScreen';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

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
    apiKey: 'AIzaSyBdw9lSrfch2KVDF3ymslfKC3fURsfpn1Y',
    authDomain: 'diary-companion.firebaseapp.com',
    projectId: 'diary-companion',
    storageBucket: 'diary-companion.appspot.com',
    messagingSenderId: '995110476734',
    appId: '1:995110476734:web:34e1c805c3f67dbcd777ef'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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
        <LoginScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

export default RootLayout;

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
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

  //useEffect(() => {
  //  if (loaded) {
  //    SplashScreen.hideAsync();
  //  }
  //}, [loaded]);

  //if (!loaded) {
  //  return null;
  //}

  // Firebase
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA1rH29rCYP8L7C45Rf3YAoJ1oypjk6N0g",
    authDomain: "diary-companion-428814.firebaseapp.com",
    projectId: "diary-companion-428814",
    storageBucket: "diary-companion-428814.appspot.com",
    messagingSenderId: "903151581193",
    appId: "1:903151581193:web:f369c7a8c9bfc64ff6e0d8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //console.log('Firebase initialized', db);
  const loggedIn = false; // debug
  ////const loggedIn = true; // debug

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
  },
  containerLogin: {
    flex: 1,
    backgroundColor: C42_VIOLET,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default RootLayout;

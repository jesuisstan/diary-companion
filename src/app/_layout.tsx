import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar } from 'react-native';

import { C42_GREEN, C42_VIOLET } from '@/style/Colors';
import LoginScreen from '@/components/LoginScreen';
import { app } from '@/utils/firebase';
import { User } from 'firebase/auth';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//interface User {
//  displayName: string;
//  photoURL: string;
//}

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('Firebase initialized', app);
  }, []);

  if (!loaded) {
    return null;
  }

  //const loggedIn = !!user;
  const loggedIn = false;
  //const loggedIn = true;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
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

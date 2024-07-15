import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/utils/firebase';
import { C42_GREEN } from '@/style/Colors';
import LoginScreen from '@/components/LoginScreen';
import { UserProvider, useUser } from '@/contexts/UserContext';
import shootAlert from '@/utils/shoot-alert';
import { NotesProvider, useNotes } from '@/contexts/NotesContext';

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

  return (
    <UserProvider>
      <NotesProvider>
        <MainContent />
      </NotesProvider>
    </UserProvider>
  );
};

const MainContent = () => {
  const { user } = useUser();
  const { fetchNotes } = useNotes();

  useEffect(() => {
    if (user) {
      fetchNotes(user.email!);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      {!user ? (
        <LoginScreen />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
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

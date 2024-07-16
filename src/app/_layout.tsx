import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import DiaryApp from '@/components/DiaryApp';
import { UserProvider } from '@/contexts/UserContext';
import { NotesProvider } from '@/contexts/NotesContext';
import { NetworkProvider } from '@/contexts/NetworkContext';

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
    <NetworkProvider>
      <UserProvider>
        <NotesProvider>
          <DiaryApp />
        </NotesProvider>
      </UserProvider>
    </NetworkProvider>
  );
};

export default RootLayout;

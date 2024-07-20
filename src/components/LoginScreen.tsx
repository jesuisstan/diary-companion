import { FC, useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import 'expo-dev-client';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, User } from 'firebase/auth';

import { auth } from '@/utils/firebase';
import { useUser } from '@/contexts/UserContext';
import { C42_GREEN } from '@/style/Colors';
import { ThemedText } from './ui/ThemedText';
import shootAlert from '@/utils/shoot-alert';

const LoginScreen: FC = () => {
  const { setUser } = useUser();
  const [initializing, setInitializing] = useState(true);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID!,
    offlineAccess: true,
    forceCodeForRefreshToken: true
  });

  const onAuthStateChanged = (user: User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe(); // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      setUser(userCredential.user);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            shootAlert('Oops!', 'Sign in was cancelled.');
            break;
          case statusCodes.IN_PROGRESS:
            shootAlert('Pending...', 'Sign in is in progress.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            shootAlert('Error!', 'Play services not available.');
            break;
          default:
            shootAlert('Oops!', 'Error signing in with Google.');
        }
      } else {
        shootAlert('Oops!', 'Unknown error. Try again later.');
      }
    }
  };

  return initializing ? null : (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/favicon.png')}
        style={{ width: 50, height: 50 }}
      />
      <ThemedText type="subtitle">Welcome to your</ThemedText>
      <ThemedText type="title">Diary Companion</ThemedText>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        color="dark"
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C42_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 21
  }
});

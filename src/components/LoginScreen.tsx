import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import 'expo-dev-client';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  User
} from 'firebase/auth';
import { app } from '@/utils/firebase';

interface LoginScreenProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ user, setUser }) => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID!,
    offlineAccess: true,
    forceCodeForRefreshToken: true
  });

  const auth = getAuth(app);

  const [initializing, setInitializing] = useState(true);

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
      console.log('Signed in with Google! User:', userCredential.user);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.error('Sign in was cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            console.error('Sign in is in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error('Play services not available');
            break;
          default:
            console.error('Error signing in with Google:', error);
        }
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48, marginTop: 200 }}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.displayName}!</Text>
      <Image
        source={{ uri: user.photoURL! }}
        style={{ width: 100, height: 100 }}
      />
      <Button title="Sign out" onPress={signOut} />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

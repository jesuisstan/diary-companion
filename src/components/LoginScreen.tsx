import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import 'expo-dev-client';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

const LoginScreen = ({ user, setUser }: { user: any; setUser: any }) => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true // [Android] related to `serverAuthCode`, read the docs link below *.
  });

  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = await auth().signInWithCredential(googleCredential);
      console.log('Signed in with Google! User:', user_sign_in);
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
            console.error(
              'Error signing in with Google:',
              JSON.stringify(error, null, 2)
            );
        }
      } else {
        console.error('Unknown error:', JSON.stringify(error, null, 2));
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
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
        source={{ uri: user.photoURL }}
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

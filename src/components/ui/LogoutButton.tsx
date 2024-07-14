import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/utils/firebase';
import { useUser } from '@/contexts/UserContext';
import { C42_TEXT } from '@/style/Colors';
import shootAlert from '@/utils/shoot-alert';

const LogoutButton: React.FC = () => {
  const { setUser } = useUser();

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth.signOut();
      setUser(null);
    } catch (error) {
      shootAlert('Oops!', 'Error signing out with Google.');
    }
  };

  return (
    <Pressable style={styles.container} onPress={signOut}>
      <Ionicons name="exit" size={42} color={C42_TEXT} />
    </Pressable>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

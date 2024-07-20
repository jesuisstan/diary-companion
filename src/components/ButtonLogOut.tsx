import 'expo-dev-client';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Ionicons } from '@expo/vector-icons';

import { auth } from '@/utils/firebase';
import { useUser } from '@/contexts/UserContext';
import shootAlert from '@/utils/shoot-alert';
import { C42_TEXT } from '@/style/Colors';

const ButtonLogOut: React.FC = () => {
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
      <Ionicons name="exit-outline" size={35} color={C42_TEXT} />
    </Pressable>
  );
};

export default ButtonLogOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

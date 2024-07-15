import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';

import LoginScreen from '@/components/LoginScreen';
import { useUser } from '@/contexts/UserContext';
import { useNotes } from '@/contexts/NotesContext';
import { C42_GREEN } from '@/style/Colors';

const DiaryApp = () => {
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

export default DiaryApp;

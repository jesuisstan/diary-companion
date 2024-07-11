import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar, Text } from 'react-native';

import { C42_GREEN, C42_VIOLET } from '@/style/Colors';
import Button42 from '@/components/ui/Button42';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
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
    <>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <View style={styles.container}>
        <Text>Not logged in</Text>
        <Button42
          title="Login"
          onPress={() => {
            console.log('Login clicked');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: C42_GREEN,
    alignItems: 'center'
  }
});

export default LoginScreen;

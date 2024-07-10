import { StyleSheet } from 'react-native';

import ThemedView from '@/components/ui/ThemedView';
import Spinner from '@/components/ui/Spinner';

const HomeScreen = () => {
  return (
    <ThemedView style={[styles.container]}>
      <Spinner size={21} />
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 18,
    gap: 18
  }
});

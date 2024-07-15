import { StyleSheet, ScrollView, Text } from 'react-native';

import Spinner from '@/components/ui/Spinner';

const CalendarScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Spinner size={42} />
      <Text>Coming soon...</Text>
    </ScrollView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerContent: {
    margin: 18,
    gap: 18,
    alignItems: 'center'
  }
});

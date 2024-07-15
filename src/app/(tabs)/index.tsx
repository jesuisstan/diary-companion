import { ScrollView, StyleSheet, View } from 'react-native';

import { useNotes } from '@/contexts/NotesContext';
import NotesList from '@/components/NotesList';
import Spinner from '@/components/ui/Spinner';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_BACKGROUND } from '@/style/Colors';

const HomeScreen = () => {
  const { loading, notes } = useNotes();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.fixedTitle}>
        Your Diary Notes
      </ThemedText>
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.spacer} />
        {loading ? (
          <View style={styles.spinnerContainer}>
            <Spinner size={42} />
          </View>
        ) : (
          <NotesList notes={notes} />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fixedTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: C42_BACKGROUND, // Add a background color if needed
    zIndex: 1,
    textAlign: 'center',
    padding: 10,
    height: 50 // Adjust height to match the height of the spacer
  },
  spacer: {
    height: 50 // Adjust height to match the height of the fixed title
  },
  containerContent: {
    alignItems: 'center'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  }
});

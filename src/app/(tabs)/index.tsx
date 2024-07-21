import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { useNotes } from '@/contexts/NotesContext';
import NotesList from '@/components/NotesList';
import NotesAnalysis from '@/components/NotesAnalysis';
import Spinner from '@/components/ui/Spinner';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_BACKGROUND, C42_GREEN } from '@/style/Colors';

const HomeScreen = () => {
  const { loading, notes } = useNotes();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.fixedTitle}>
        Recent Notes & Vibes
      </ThemedText>
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.spacer} />
        {loading ? (
          <View style={styles.spinnerContainer}>
            <Spinner size={42} />
          </View>
        ) : (
          <>
            <ThemedText type="defaultSemiBold" style={styles.leftAlignedText}>
              The last diary notes:
            </ThemedText>
            <NotesList notes={notes.slice(0, 2)} />
            {notes && (
              <>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.leftAlignedText}
                >
                  The vibe of your{' '}
                  <Text style={styles.ammount}>{notes.length}</Text> diary
                  notes:
                </ThemedText>
                <NotesAnalysis notes={notes} />
              </>
            )}
          </>
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
    alignItems: 'center',
    gap: 10
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
  ammount: {
    fontWeight: 'bold',
    color: C42_GREEN,
    fontSize: 21
  },
  leftAlignedText: {
    textAlign: 'left',
    width: '100%',
    paddingLeft: 21,
    paddingRight: 21
  }
});

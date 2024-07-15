import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

import { ThemedText } from '@/components/ui/ThemedText';
import Collapsible from '@/components/ui/Collapsible';
import Spinner from '@/components/ui/Spinner';
import { feelingsMap, useNotes } from '@/contexts/NotesContext';
import { C42_BACKGROUND, C42_GREY, C42_ORANGE, C42_TEXT } from '@/style/Colors';

const HomeScreen = () => {
  const { loading, notes, deleteNote } = useNotes();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.fixedTitle}>
        Your Diary Notes
      </ThemedText>
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.spacer} />
        {!notes || loading ? (
          <View style={styles.spinnerContainer}>
            <Spinner size={42} />
          </View>
        ) : notes.length === 0 ? (
          <View style={styles.spinnerContainer}>
            <ThemedText type="default">No notes yet</ThemedText>
          </View>
        ) : (
          <View style={styles.list}>
            {notes.map((note) => (
              <Collapsible
                key={note.id}
                title={note.title + ' | ' + note.date}
                style={styles.collapsible}
              >
                <View style={styles.card}>
                  <ThemedText type="defaultSemiBold">
                    {'Feels: ' +
                      note.feeling +
                      ' | ' +
                      feelingsMap[note.feeling]}
                  </ThemedText>
                  <ThemedText type="default">{note.content}</ThemedText>
                  <Button
                    color={C42_ORANGE}
                    icon={
                      <AntDesign
                        name="delete"
                        size={21}
                        color={C42_TEXT}
                        style={{ marginRight: 21 }}
                      />
                    }
                    title="Delete note"
                    titleStyle={{ color: C42_TEXT }}
                    onPress={() => deleteNote(note)}
                  />
                </View>
              </Collapsible>
            ))}
          </View>
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
  list: {
    width: '100%',
    padding: 18,
    gap: 21
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
  card: {
    gap: 10,
    padding: 10
  },
  collapsible: {
    borderColor: C42_GREY,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  }
});

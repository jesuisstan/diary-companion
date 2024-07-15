import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

import { ThemedText } from '@/components/ui/ThemedText';
import Collapsible from '@/components/ui/Collapsible';
import Spinner from '@/components/ui/Spinner';
import { feelingsMap, useNotes } from '@/contexts/NotesContext';
import { C42_ORANGE, C42_TEXT } from '@/style/Colors';

const HomeScreen = () => {
  const { notes, fetchNotes, addNewNote, deleteNote } = useNotes();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <ThemedText type="title">Your Diary Notes</ThemedText>
      {!notes ? (
        <Spinner size={42} />
      ) : notes.length === 0 ? (
        <ThemedText type="default">No notes yet</ThemedText>
      ) : (
        <View style={styles.list}>
          {notes.map((note) => (
            <Collapsible
              key={note.id}
              title={
                feelingsMap[note.feeling] +
                ' | ' +
                note.title +
                ' | ' +
                note.date
              }
            >
              <View style={{ gap: 21 }}>
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerContent: {
    alignItems: 'center'
  },
  list: {
    width: '100%',
    padding: 18,
    gap: 18
  }
});

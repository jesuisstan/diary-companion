import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

import { ThemedText } from '@/components/ui/ThemedText';
import Collapsible from '@/components/ui/Collapsible';
import { feelingsMap, TNote, useNotes } from '@/contexts/NotesContext';
import { C42_GREY, C42_ORANGE, C42_TEXT } from '@/style/Colors';
import { formatDate } from '@/utils/format-date';

const NotesList = ({ notes }: { notes: TNote[] }) => {
  const { deleteNote } = useNotes();

  return (
    <View style={styles.list}>
      {notes.length ? (
        notes.map((note) => (
          <Collapsible
            key={note.id}
            title={`${note.title} | ${formatDate(note.date)}`}
            style={styles.collapsible}
          >
            <View style={styles.card}>
              <ThemedText type="defaultSemiBold">
                {`Feels: ${note.feeling} | ${feelingsMap[note.feeling]}`}
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
        ))
      ) : (
        <ThemedText type="default" style={styles.text}>
          No notes available
        </ThemedText>
      )}
    </View>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 18,
    gap: 21
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
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

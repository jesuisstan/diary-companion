import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { ThemedText } from '@/components/ui/ThemedText';
import Collapsible from '@/components/ui/Collapsible';
import { feelingsMap, TNote, useNotes } from '@/contexts/NotesContext';
import { formatDate } from '@/utils/format-date';
import getFeelingColor from '@/utils/get-feeling-color';
import { C42_GREY, C42_ORANGE, C42_WHITE } from '@/style/Colors';

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
                Feels:{' '}
                <Text
                  style={{
                    color: getFeelingColor(note.feeling as TNote['feeling'])
                  }}
                >
                  {note.feeling}
                </Text>{' '}
                | {feelingsMap[note.feeling]}
              </ThemedText>
              <ThemedText type="default">{note.content}</ThemedText>
              <AntDesign
                name="delete"
                size={21}
                color={C42_ORANGE}
                onPress={() => deleteNote(note)}
                style={{ paddingTop: 10 }}
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
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  collapsible: {
    borderColor: C42_GREY,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: C42_WHITE
  }
});

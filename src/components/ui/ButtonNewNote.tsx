import 'react-native-reanimated';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button, Overlay } from '@rneui/themed';

import { useUser } from '@/contexts/UserContext';
import { useNotes, feelingsMap } from '@/contexts/NotesContext';
import Spinner from '@/components/ui/Spinner';
import shootAlert from '@/utils/shoot-alert';
import { C42_TEXT, C42_GREEN, C42_GREY } from '@/style/Colors';

const MAX_LENGTH_TITLE = 15;

const ButtonNewNote = () => {
  const { height } = useWindowDimensions();
  const { user } = useUser();
  const { loading, addNewNote } = useNotes();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState<keyof typeof feelingsMap>('neutral');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleTitleChange = (text: string) => {
    if (text.length <= MAX_LENGTH_TITLE) {
      setTitle(text);
    } else {
      shootAlert(
        'Oops!',
        `Title is too long. Max ${MAX_LENGTH_TITLE} symbols.`
      );
    }
  };

  const submitNewNote = async () => {
    if (!title.trim() || !content.trim()) {
      // Do not proceed if title or content is empty
      return;
    }
    await addNewNote({
      content,
      date: new Date().toISOString(),
      email: user?.email!,
      feeling,
      title
    });
    setTitle('');
    setContent('');
    setFeeling('neutral');
    toggleOverlay();
  };

  return (
    <Pressable style={styles.floatingButton} onPress={toggleOverlay}>
      <AntDesign name="addfile" size={21} color={C42_TEXT} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={[styles.overlayContent, { minHeight: 0.5 * height }]}>
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner size={42} />
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={[
                  styles.inputTitle,
                  title.length > MAX_LENGTH_TITLE && { color: 'red' }
                ]}
                placeholder={`Add note title (max ${MAX_LENGTH_TITLE} symbol)`}
                value={title}
                onChangeText={handleTitleChange}
              />
              <Text style={styles.label}>Content:</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Add note content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={8}
                scrollEnabled
              />
              <Text style={styles.label}>Feeling: {feeling}</Text>
              <View style={styles.feelingsContainer}>
                {Object.entries(feelingsMap).map(([key, emoji]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setFeeling(key as keyof typeof feelingsMap)}
                  >
                    <Text
                      style={
                        feeling === key ? styles.selectedEmoji : styles.emoji
                      }
                    >
                      {emoji}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button
                color={C42_GREEN}
                icon={
                  <AntDesign
                    name="addfile"
                    size={21}
                    color={C42_TEXT}
                    style={{ marginRight: 21 }}
                  />
                }
                title="Add note"
                titleStyle={{ color: C42_TEXT }}
                disabled={!title.trim() || !content.trim()}
                onPress={submitNewNote}
              />
            </ScrollView>
          )}
        </View>
      </Overlay>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: 42,
    height: 42,
    borderRadius: 28, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C42_GREEN, // Default background color
    elevation: 4, // for Android shadow
    shadowColor: C42_TEXT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 100, // Ensure it's above other components
    opacity: 0.7
  },
  overlayContent: {
    padding: 20,
    width: 300
  },
  scrollViewContent: {
    flexGrow: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: C42_TEXT
  },
  inputTitle: {
    height: 40,
    borderColor: C42_GREY,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  textArea: {
    height: 142,
    borderColor: C42_GREY,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    paddingVertical: 10
  },
  feelingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  emoji: {
    fontSize: 21
  },
  selectedEmoji: {
    fontSize: 24,
    borderColor: C42_GREEN,
    borderWidth: 1,
    borderRadius: 15,
    padding: 5
  }
});

export default ButtonNewNote;

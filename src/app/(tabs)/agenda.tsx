import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useNotes } from '@/contexts/NotesContext';
import NotesList from '@/components/NotesList';
import Spinner from '@/components/ui/Spinner';
import { C42_GREY, C42_ORANGE } from '@/style/Colors';

type TCalendarDay = {
  dateString: string;
  day: number;
  month: number;
  year: number;
};

const AgendaScreen = () => {
  const { loading, notes } = useNotes();
  const [selected, setSelected] = useState<string>('');
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    setSelected(today);
  }, []);

  const handleDayPress = (day: TCalendarDay) => {
    setSelected(day.dateString);
  };

  // Helper function to extract year, month, and day from a date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month has 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure day has 2 digits
    return `${year}-${month}-${day}`;
  };

  // Filter notes based on the selected date
  const filteredNotes = notes.filter((note) => {
    const noteDate = formatDate(note.date);
    return noteDate === selected;
  });

  const isLandscape = windowWidth > windowHeight || windowHeight < 400;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { flexDirection: isLandscape ? 'row' : 'column' }
      ]}
    >
      <View style={isLandscape ? styles.calendarContainerLandscape : null}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: C42_ORANGE
            }
          }}
          style={
            isLandscape ? styles.calendarLandscape : styles.calendarPortrait
          }
        />
      </View>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <Spinner size={42} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <NotesList notes={filteredNotes} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 18
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
  calendarPortrait: {
    borderWidth: 1,
    borderColor: C42_GREY,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%'
  },
  calendarLandscape: {
    transform: [{ scale: 0.6 }],
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 15
  },
  calendarContainerLandscape: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

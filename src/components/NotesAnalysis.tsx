import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { TNote, feelingsMap } from '@/contexts/NotesContext';
import getFeelingColor from '@/utils/get-feeling-color';
import { C42_GREY, C42_WHITE } from '@/style/Colors';

type TNotesAnalysisProps = {
  notes: TNote[];
};

const NotesAnalysis: React.FC<TNotesAnalysisProps> = ({ notes }) => {
  const feelingsCount: { [key in TNote['feeling']]: number } = {
    happy: 0,
    content: 0,
    neutral: 0,
    sad: 0,
    upset: 0,
    devastated: 0
  };

  notes.forEach((note) => {
    feelingsCount[note.feeling]++;
  });

  const totalNotes = notes.length;

  const feelingsPercentage = Object.keys(feelingsCount).reduce((acc, key) => {
    const feelingKey = key as keyof typeof feelingsCount;
    acc[feelingKey] = ((feelingsCount[feelingKey] / totalNotes) * 100).toFixed(
      2
    );
    return acc;
  }, {} as { [key in TNote['feeling']]: string });

  return (
    <View style={styles.card}>
      {Object.keys(feelingsCount).map((feeling) => (
        <View key={feeling} style={styles.feelingRow}>
          <Text
            style={[
              styles.feelingText,
              { color: getFeelingColor(feeling as TNote['feeling']) }
            ]}
          >
            {feeling}:
          </Text>
          <Text style={styles.feelingText}>
            {feelingsPercentage[feeling as keyof typeof feelingsPercentage]}%
            {'    '}
            {feelingsMap[feeling as keyof typeof feelingsPercentage]}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default NotesAnalysis;

const styles = StyleSheet.create({
  card: {
    borderColor: C42_GREY,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    minWidth: '60%',
    width: '80%',
    maxWidth: '90%',
    backgroundColor: C42_WHITE
  },
  feelingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  feelingText: {
    fontSize: 16
  }
});

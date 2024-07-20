import {
  C42_GREEN_DARK,
  C42_GREEN,
  C42_TEXT,
  C42_ORANGE,
  C42_ORANGE_DARK,
  C42_RED
} from '@/style/Colors';
import { TNote } from '@/contexts/NotesContext';

const getFeelingColor = (feeling: TNote['feeling']) => {
  switch (feeling) {
    case 'happy':
      return C42_GREEN;
    case 'content':
      return C42_GREEN_DARK;
    case 'neutral':
      return C42_TEXT;
    case 'devastated':
      return C42_RED;
    case 'sad':
      return C42_ORANGE;
    case 'upset':
      return C42_ORANGE_DARK;
    default:
      return C42_TEXT; // Default color if feeling is unknown
  }
};

export default getFeelingColor;

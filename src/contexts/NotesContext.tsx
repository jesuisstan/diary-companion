import { FC, ReactNode, createContext, useContext, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc
} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import shootAlert from '@/utils/shoot-alert';

// Define the shape of the context state
export type TNote = {
  id: string;
  content: string;
  date: string;
  email: string;
  feeling: 'happy' | 'content' | 'neutral' | 'sad' | 'upset' | 'devastated';
  title: string;
};

export const feelingsMap = {
  happy: '😀',
  content: '🙂',
  neutral: '😐',
  sad: '🙁',
  upset: '😢',
  devastated: '😭'
};

interface NotesContextState {
  notes: TNote[];
  fetchNotes: (userEmail: string) => Promise<void>;
  addNewNote: (note: Omit<TNote, 'id'>) => Promise<void>;
  deleteNote: (note: TNote) => Promise<void>;
}

const NotesContext = createContext<NotesContextState | undefined>(undefined);

export const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<TNote[]>([]);

  const fetchNotes = async (userEmail: string) => {
    try {
      const notesQuery = query(
        collection(db, 'diary-companion-db'),
        where('email', '==', userEmail)
      );
      const querySnapshot = await getDocs(notesQuery);
      const fetchedNotes: TNote[] = [];
      querySnapshot.forEach((doc) => {
        fetchedNotes.push({ id: doc.id, ...doc.data() } as TNote);
      });
      setNotes(fetchedNotes);
    } catch (e) {
      shootAlert('Error!', 'Failed to fetch Firestore data.');
      console.error('Error fetching Firestore data: ', e); // debug
    }
  };

  const addNewNote = async (newNote: Omit<TNote, 'id'>) => {
    try {
      await addDoc(collection(db, 'diary-companion-db'), newNote);
      fetchNotes(newNote.email);
    } catch (e) {
      shootAlert('Error!', 'Failed to add new note.');
      console.error('Error adding new note: ', e); // debug
    }
  };

  const deleteNote = async (note: TNote) => {
    try {
      await deleteDoc(doc(db, 'diary-companion-db', note.id));
      fetchNotes(note.email);
    } catch (e) {
      shootAlert('Error!', 'Failed to delete note.');
      console.error('Error deleting note: ', e); // debug
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, addNewNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextState => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

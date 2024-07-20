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
import { useNetwork } from '@/contexts/NetworkContext';

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

type TNotesContextState = {
  loading: boolean;
  notes: TNote[];
  fetchNotes: (userEmail: string) => Promise<void>;
  addNewNote: (note: Omit<TNote, 'id'>) => Promise<void>;
  deleteNote: (note: TNote) => Promise<void>;
};

const NotesContext = createContext<TNotesContextState | undefined>(undefined);

export const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isConnected } = useNetwork(); // Get the network status

  const fetchNotes = async (userEmail: string) => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
      return;
    }

    try {
      setLoading(true);
      const notesQuery = query(
        collection(db, 'diary-companion-db'),
        where('email', '==', userEmail)
      );
      const querySnapshot = await getDocs(notesQuery);
      const fetchedNotes: TNote[] = [];
      querySnapshot.forEach((doc) => {
        fetchedNotes.push({ id: doc.id, ...doc.data() } as TNote);
      });

      // Sort notes by date from newest to oldest
      fetchedNotes.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setNotes(fetchedNotes);
    } catch (e) {
      if (e instanceof TypeError && e.message === 'Network request failed') {
        shootAlert('Network Error!', 'Please check your internet connection.');
      } else {
        shootAlert('Error!', 'Failed to fetch Firestore data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addNewNote = async (newNote: Omit<TNote, 'id'>) => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'diary-companion-db'), newNote);
      fetchNotes(newNote.email);
    } catch (e) {
      if (e instanceof TypeError && e.message === 'Network request failed') {
        shootAlert('Network Error!', 'Please check your internet connection.');
      } else {
        shootAlert('Error!', 'Failed to add new note.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (note: TNote) => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
      return;
    }

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'diary-companion-db', note.id));
      fetchNotes(note.email);
    } catch (e) {
      if (e instanceof TypeError && e.message === 'Network request failed') {
        shootAlert('Network Error!', 'Please check your internet connection.');
      } else {
        shootAlert('Error!', 'Failed to delete note.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{ loading, notes, fetchNotes, addNewNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): TNotesContextState => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

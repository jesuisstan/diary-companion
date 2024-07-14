import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../credentials/firebase-config';

const app = initializeApp(firebaseConfig);

export { app };

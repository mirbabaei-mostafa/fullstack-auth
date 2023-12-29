import { FirebaseApp, initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: 'fullstack-auth-ddcab.firebaseapp.com',
  projectId: 'fullstack-auth-ddcab',
  storageBucket: 'fullstack-auth-ddcab.appspot.com',
  messagingSenderId: '772525941202',
  appId: '1:772525941202:web:9c01f99ecdd86f628ba80b',
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export default app;

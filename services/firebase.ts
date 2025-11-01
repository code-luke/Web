// FIX: Changed to Firebase v9 compat imports to resolve initialization errors,
// likely caused by an older firebase version in the project.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Ganti dengan konfigurasi Firebase Anda sendiri
// Anda bisa mendapatkannya dari Firebase Console proyek Anda:
// Project Settings > General > Your apps > Web app > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Ekspor layanan Firebase yang akan digunakan
export const auth = firebase.auth();
export const db = firebase.firestore();

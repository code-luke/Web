// FIX: The original import causes an error, likely due to a Firebase version mismatch (e.g., using v9 syntax with a v8 dependency).
// Switched to the v8 compatibility library syntax to resolve the immediate import error.
// Note: This makes the exported 'auth' and 'db' objects follow the v8 API,
// which will require updating other files in the app that currently use v9 modular functions.
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Ekspor layanan Firebase yang akan digunakan
export const auth = firebase.auth();
export const db = firebase.firestore();

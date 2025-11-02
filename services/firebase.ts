// FIX: Changed to Firebase v9 compat imports to resolve initialization errors,
// likely caused by an older firebase version in the project.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Ganti dengan konfigurasi Firebase Anda sendiri
// Anda bisa mendapatkannya dari Firebase Console proyek Anda:
// Project Settings > General > Your apps > Web app > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyAXbQu13OiMd-hpWvJGR3Zz9VJ7dI3T2X8",
  authDomain: "jurusanku-app-5d190.firebaseapp.com",
  projectId: "jurusanku-app-5d190",
  storageBucket: "jurusanku-app-5d190.firebasestorage.app",
  messagingSenderId: "390147130189",
  appId: "1:390147130189:web:6ba5a18724488f68e72d04",
  measurementId: "G-537XN3G5KD"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Ekspor layanan Firebase yang akan digunakan
export const auth = firebase.auth();
export const db = firebase.firestore();

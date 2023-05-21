// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlcuVBmUxI8dV9pziNX5u6YktxfQjbKEw",
    authDomain: "busticketbooking-455c8.firebaseapp.com",
    projectId: "busticketbooking-455c8",
    storageBucket: "busticketbooking-455c8.appspot.com",
    messagingSenderId: "176983530226",
    appId: "1:176983530226:web:fc34434c0203043606ce6b",
    measurementId: "G-Y26Q2CKKRR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdvXCJyBEOwZbGDsAxWmZiN3kQYG3_dK0",
    authDomain: "chatroom-dae48.firebaseapp.com",
    projectId: "chatroom-dae48",
    storageBucket: "chatroom-dae48.appspot.com",
    messagingSenderId: "1049025060526",
    appId: "1:1049025060526:web:a9d0cd405b847ce65e173f",
    measurementId: "G-JQD74K0LP6"
  };

let firebaseApp;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = getApps()[0]
}

export default firebaseApp

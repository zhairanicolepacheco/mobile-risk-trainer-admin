import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzMxfhxkbd4o0LEeMzNTdOgPWJsKsuSRY",
  authDomain: "thesis-d6ac1.firebaseapp.com",
  projectId: "thesis-d6ac1",
  storageBucket: "thesis-d6ac1.appspot.com",
  messagingSenderId: "659417804507",
  appId: "1:659417804507:android:76d74879068d5dc5bc26fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
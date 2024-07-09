
import { initializeApp } from "firebase/app";
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyCXw9x24-x0OEb328a29Yo3kNKFD1eVHuQ",
  authDomain: "fest-connect-storage.firebaseapp.com",
  projectId: "fest-connect-storage",
  storageBucket: "fest-connect-storage.appspot.com",
  messagingSenderId: "76051385499",
  appId: "1:76051385499:web:7ce8370468f57d9bfdca3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

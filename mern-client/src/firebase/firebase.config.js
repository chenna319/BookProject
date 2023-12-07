// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3JFNzBnFX4EfzttJ_bj7JMf1CYjJwoww",
  authDomain: "mern-book-inventory-cv.firebaseapp.com",
  projectId: "mern-book-inventory-cv",
  storageBucket: "mern-book-inventory-cv.appspot.com",
  messagingSenderId: "989582032984",
  appId: "1:989582032984:web:533de17706f6d7bfff4a2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
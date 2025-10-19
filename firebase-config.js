// firebase-config.js

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
// Make sure this line is here
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGKjwLZIGYxb5BMU1b3TSYb62s34E4Vvw",
    authDomain: "kasi-hustler-101.firebaseapp.com",
    projectId: "kasi-hustler-101",
    storageBucket: "kasi-hustler-101.firebasestorage.app",
    messagingSenderId: "281284124179",
    appId: "1:281284124179:web:69f06dc2d39072c345e9e6",
    measurementId: "G-FLQ65EV8H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
// And make sure this line is here
export const db = getFirestore(app);
// firebase-config.js

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js"; // Import Firebase Storage

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
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize and export Storage

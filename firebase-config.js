
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
    
// TODO: Add SDKs for Firebase products that you want to use
    
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// auth-status.js
// This script checks the user's login status and updates the navigation bar accordingly using only local storage.

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');

    onAuthStateChanged(auth, (user) => {
        if (authContainer) {
            if (user) {
                // User is signed in.
                // Get the profile image from local storage for a fast load.
                // We will use a unique key for each user to avoid conflicts if multiple users log in on the same browser.
                const profileImageSrc = localStorage.getItem(`userProfileImage_${user.uid}`) || 'default-profile-picture.png';

                // Replace the login button with the profile picture button.
                authContainer.innerHTML = `
                    <a href="myprofile.html" class="profile-nav-btn" title="My Profile">
                        <img src="${profileImageSrc}" alt="My Profile">
                    </a>
                `;
            } else {
                // User is signed out.
                // Ensure the login button is displayed.
                authContainer.innerHTML = `
                    <a href="auth.html" class="nav-link btn-auth">Sign Up / Login</a>
                `;
            }
        }
    });
});


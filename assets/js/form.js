
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitButton = document.getElementById("submit-button");
const modePrompt = document.getElementById("mode-prompt");
const modeToggle = document.getElementById("mode-toggle");
const statusMessage = document.getElementById("status-message");
const signedInPanel = document.getElementById("signed-in-panel");
const userEmail = document.getElementById("user-email");
const passwordInput = document.getElementById("password");
const signOutButton = document.getElementById("sign-out-button");

let auth;
let isSignUp = true;

form.hidden = true;
document.querySelector(".switch-mode").hidden = true;

function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
}

function getErrorMessage(error) {
    const messages = {
        "auth/email-already-in-use": "An account already exists for this email. Try logging in.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/weak-password": "Choose a stronger password (at least 6 characters).",
        "auth/too-many-requests": "Too many attempts. Please wait and try again."
    };

    return messages[error.code] || "Authentication failed. Check your Firebase setup and try again.";
}

function setMode(signUp) {
    isSignUp = signUp;
    formTitle.textContent = signUp ? "Create account" : "Log in";
    submitButton.textContent = signUp ? "Create account" : "Log in";
    modePrompt.textContent = signUp ? "Already have an account?" : "Need an account?";
    modeToggle.textContent = signUp ? "Log in" : "Create account";
    passwordInput.autocomplete = signUp ? "new-password" : "current-password";
    showStatus("");
}

modeToggle.addEventListener("click", () => setMode(!isSignUp));

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    showStatus("");

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    try {
        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        form.reset();
    } catch (error) {
        showStatus(getErrorMessage(error), true);
    } finally {
        submitButton.disabled = false;
    }
});

signOutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        showStatus("You have been signed out.");
    } catch {
        showStatus("Could not sign out. Please try again.", true);
    }
});

async function initializeAuth() {
    let configModule;
    try {
        configModule = await import("../../firebase-config.js");
    } catch (error) {
        throw new Error("Could not load firebase-config.js. Copy firebase-config.example.js, add your Firebase settings, and ensure the file is valid JavaScript.", { cause: error });
    }

    const config = configModule.firebaseConfig;
    if (!config || !config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
        throw new Error("Firebase configuration is incomplete. Add apiKey, authDomain, projectId, and appId to firebase-config.js.");
    }

    auth = getAuth(initializeApp(config));
    onAuthStateChanged(auth, (user) => {
        const isSignedIn = Boolean(user);
        form.hidden = isSignedIn;
        document.querySelector(".switch-mode").hidden = isSignedIn;
        signedInPanel.hidden = !isSignedIn;
        userEmail.textContent = user ? user.email : "";
        if (isSignedIn) showStatus("You are signed in.");
    });
}

initializeAuth().catch((error) => showStatus(error.message, true));

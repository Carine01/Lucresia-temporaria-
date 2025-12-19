// Fix: Use Firebase v8 compat imports to resolve errors with modular functions not being found.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

// Your web app's Firebase configuration using the correct credentials
const firebaseConfig = {
  apiKey: "AIzaSyALuzd7l5zVeF_Y28K6kG_l7HGk19GdsEw",
  authDomain: "lucresia-74987923-59ce3.firebaseapp.com",
  projectId: "lucresia-74987923-59ce3",
  storageBucket: "lucresia-74987923-59ce3.firebasestorage.app",
  messagingSenderId: "620022402571",
  appId: "1:620022402571:web:96636a23a77dace18f010e"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export services to be used throughout the app
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();

// Export Auth Providers
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
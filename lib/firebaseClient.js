// lib/firebaseClient.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyArcVXBL2jNcsXWyTecWitLM1I8fcgjW3A",
  authDomain: "notification-e6599.firebaseapp.com",
  projectId: "notification-e6599",
  storageBucket: "notification-e6599.firebasestorage.app",
  messagingSenderId: "710864734037",
  appId: "1:710864734037:web:e41db75853231a872591dc",
  measurementId: "G-8KK1VB74Z6"
};

// ✅ Initialize App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Messaging
let messaging = null;
if (typeof window !== "undefined" && "Notification" in window) {
  try {
    messaging = getMessaging(app);
  } catch (e) {
    console.warn("Firebase messaging not supported", e);
  }
}

// ✅ Export messaging tools
export { messaging, getToken, onMessage };

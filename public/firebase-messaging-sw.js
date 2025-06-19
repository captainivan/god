// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDBqyNSKRuChIT66HAHaZhsiXduZxlAj58",
  authDomain: "lot-to-come.firebaseapp.com",
  projectId: "lot-to-come",
  storageBucket: "lot-to-come.appspot.com",
  messagingSenderId: "443472354993",
  appId: "1:443472354993:web:3f2b4bb24015ec24990c90",
  measurementId: "G-LEHRRNLWMN"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});

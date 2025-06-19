"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebaseClient";

export default function PushNotificationClient() {
  useEffect(() => {
    const requestPermission = async () => {
      console.log("Requesting notification permission...");

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = await getToken(messaging, {
          vapidKey: process.env.VAPID_KEY
        });

        if (token) {
          console.log("FCM Token:", token);
          fetch("/api/saveToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
          });
        } else {
          console.warn("No token received.");
        }
      } else {
        console.warn("Permission denied for notifications.");
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
    
      const { title, body, image } = payload.notification;
    
      try {
        new Notification(title, {
          body,
          icon: image,
        });
      } catch (e) {
        console.error("Failed to show notification", e);
      }
    });
    
  }, []);

  return null;
}

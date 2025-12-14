"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch((err) =>
          console.error("❌ Service Worker registration failed:", err)
        );
    };

    window.addEventListener("load", registerSW);

    return () => window.removeEventListener("load", registerSW);
  }, []);

  return null;
}
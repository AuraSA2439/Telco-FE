"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 🔔 New version available
            if (confirm("New version available. Reload now?")) {
              newWorker.postMessage("SKIP_WAITING");
              window.location.reload();
            }
          }
        });
      });
    });
  }, []);

  return null;
}
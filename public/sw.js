const VERSION = "v3"; // 🔁 bump this to force update
const STATIC_CACHE = `telco-static-${VERSION}`;

// Only cache static assets
const STATIC_PATHS = [
  "/_next/static/",
  "/assets/",
  "/favicon.ico",
  "/manifest.json",
];

/* -----------------------------------
   INSTALL
------------------------------------ */
self.addEventListener("install", () => {
  self.skipWaiting();
});

/* -----------------------------------
   ACTIVATE — CLEAN OLD CACHES
------------------------------------ */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!key.includes(VERSION)) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

/* -----------------------------------
   FETCH STRATEGY
------------------------------------ */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only GET
  if (req.method !== "GET") return;

  // 🚫 Never cache API
  if (url.pathname.startsWith("/api")) {
    return;
  }

  // 🌐 HTML → NETWORK FIRST
  if (req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // 🧊 STATIC ASSETS ONLY
  const shouldCache = STATIC_PATHS.some((p) =>
    url.pathname.startsWith(p)
  );

  if (!shouldCache) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        return (
          cached ||
          fetch(req).then((res) => {
            cache.put(req, res.clone());
            return res;
          })
        );
      })
    )
  );
});

/* -----------------------------------
   UPDATE NOTIFICATION
------------------------------------ */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
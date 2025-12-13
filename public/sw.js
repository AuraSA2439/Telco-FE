self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("telco-cache-v1").then((cache) =>
      cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((res) => {
            cache.put(event.request, res.clone());
            return res;
          })
        );
      })
    )
  );
});
// ============== 1.Registration ==============
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ثبت موفقیت‌آمیز با اسکوپ:", registration.scope);
      })
      .catch((error) => {
        console.log("خطا در ثبت:", error);
      });
  });
}

// ============== 2.Installation ==============
const CACHE_NAME = "cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/assets/audio/coin.wav",
  "/Moving.js",
  "/styles/character.css",
];

// cache together
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("کش در حال پر شدن");
        return cache.addAll(ASSETS);
      })
      .catch((error) => {
        console.error("خطا در نصب:", error);
      })
  );
});
// cache separately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((file) =>
          cache
            .add(file)
            .catch((error) =>
              console.error("Failed to cache file:", file, error)
            )
        )
      );
    })
  );
});

// ============== 3.Activation ==============
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("حذف کش قدیمی:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ============== 4.Fetch ==============
// first cache, otherwise fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // بازگرداندن پاسخ کش شده یا درخواست شبکه
      return cachedResponse || fetch(event.request);
    })
  );
});
// first fetch, then if err load from cache otherwise index.html static file
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch((err) => {
      return caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || caches.match("./index.html");
      });
    })
  );
});

// first cache, otherwise fetch and put res in cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response;

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match("/offline.html");
        });
    })
  );
});

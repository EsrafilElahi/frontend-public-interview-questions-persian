# 📄 مستندات فنی سرویس ورکر (Service Worker)

## 1. مقدمه <a name="مقدمه"></a>

سرویس‌ورکرها اسکریپت‌های جاوااسکریپتی هستند که:

- در پس‌زمینه مرورگر اجرا می‌شوند
- امکان کار آفلاین را فراهم می‌کنند
- کش منابع را مدیریت می‌کنند
- عملکرد اپلیکیشن‌های وب را بهبود می‌بخشند

---

## 2. مراحل پیاده‌سازی <a name="مراحل-پیاده-سازی"></a>

### 2.1 پیش‌نیازها

- استفاده از **HTTPS** در محیط تولید
- پشتیبانی مرورگر (Chrome, Firefox, Edge)
- قراردادن فایل سرویس‌ورکر در **مسیر روت** دامنه

---

## 3. نمونه کدها <a name="نمونه-کدها"></a>

### 3.1 ثبت سرویس ورکر (Registration)

در فایل main.js

```
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
```

### 3.2 نصب و کش منابع (Installation)

// در فایل sw.js

```
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
```

### 3.3 فعال‌سازی (Activation)

```
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
```

### 3.4 مدیریت درخواست‌ها (Fetch)

```
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
```

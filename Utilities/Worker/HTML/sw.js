const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/CSS/main.css',
  '/JS/serviceWorker.js'
];

// Promise then
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        };
        return fetch(event.request);
      })
  );
});

// async await
self.addEventListener('install', async function(event) {
  try {
    event.waitUntil(async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache');
      await cache.addAll(urlsToCache);
    });
  } catch (error) {
    console.error('Error during cache installation:', error);
  };
});

self.addEventListener('fetch', async function(event) {
  try {
    event.respondWith(async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      };
      const response = await fetch(event.request);
      return response;
    });
  } catch (error) {
    console.error('Error during fetch:', error);
    // Consider returning a fallback response or error message here
  };
});


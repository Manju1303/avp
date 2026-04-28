const CACHE_NAME = 'arockia-v4';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './logo.jpeg',
  './manifest.json'
];

// Install: cache only static assets (NOT index.html)
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately, don't wait
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: delete ALL old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim()) // Take control of all open tabs
  );
});

// Fetch: HTML always from network, everything else from cache
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Always fetch HTML fresh from network
  if (event.request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // For other assets: cache-first
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

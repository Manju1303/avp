const CACHE_NAME = 'arockia-v12';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './logo.jpeg',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sitemap.xml',
  'https://unpkg.com/lucide@0.400.0/dist/umd/lucide.min.js?v=11'
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Smart Caching Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. HTML: Network-First (Always try to get fresh content, fallback to cache)
  if (event.request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 2. Images & Assets: Cache-First (Fastest, saves data)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          // Cache the new asset for future use
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});



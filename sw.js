// sw.js
const CACHE_NAME = 'websitebuilder-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './webbuilder.png'
];

// Saat install, cache semua aset penting
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Saat fetch, fallback ke index.html kalau gagal
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        // Jika file ada di cache, tampilkan
        if (response) return response;
        // Kalau file gak ada (misal user klik link yang tidak cache), fallback ke index.html
        return caches.match('/index.html');
      });
    })
  );
});

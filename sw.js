const CACHE_NAME = 'loka-planner-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png'
];

// Install Service Worker dan simpan file ke Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Intercept request internet, gunakan cache jika tersedia
self.addEventListener('fetch', (event) => {
    // Abaikan request dari ekstensi chrome atau API eksternal (termasuk Firebase)
    if (!(event.request.url.indexOf('http') === 0)) return;
    
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return dari cache jika ada, kalau tidak ada fetch dari internet
            return cachedResponse || fetch(event.request);
        })
    );
});

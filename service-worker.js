self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('fitness99-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'goals.html',
        'manifest.json',
        'service-worker.js',
        ...Array.from({ length: 99 }, (_, i) => `day${i + 1}.html`)
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

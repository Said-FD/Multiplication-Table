var staticCacheName = 'multiplify-v0.1';
var cacheFiles = [
	'./',
	'./index.html',
	'./multiplication-green.png'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName !== staticCacheName) {
						return caches.delete(cacheName);
					}
				})
			);
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

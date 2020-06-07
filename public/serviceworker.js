// usefull if we change the version of cache
//
const CACHE_NAME = "version-1";

const urlsToCache = ["index.html", "offline.html"];

const self = this;

// install SW
self.addEventListener("install", event => {
	// we need a cache version its important to store data for the frontend version
	// also to remove old data
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			console.log("Opened cache");

			return cache.addAll(urlsToCache);
		})
	);
});

// listen fro request
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() =>
				caches.match("offline.html")
			);
		})
	);
});

// Active the SW

self.addEventListener("activate", event => {
	// when we load a page if we change the cache version
	// then remove old cached information
	const cacheWhitelist = [];

	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then(cachesNames =>
			Promise.all(
				cachesNames.map(cacheName => {
					if (
						!cacheWhitelist.includes(
							cacheName
						)
					) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});

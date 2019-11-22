const CACHE_NAME = "myfirstsubmissionv8";
var urlsToCache = [
    "/",
    "nav.html",
    "/index.html",
    "/footer.html",
    "/manifest.json",
    "/river.png",
    "/pages/home.html",
    "/pages/topic.html",
    "/pages/timeline.html",
    "/pages/profile.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/footer.js",
    "/img/francesco-ungaro-GX81x7KTfIw-unsplash.jpg",
    "/img/ionut-andrei-coman-xHSfeFZ7ZC8-unsplash.jpg",
    "/img/jan-kopriva-p1SKuYXxqec-unsplash.jpg",
    "/img/levi-saunders-WJQQbVvkzcI-unsplash.jpg",
    "/img/me.jpg",
    "/img/download.jpg",
    "/img/2928_main_image.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil (
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName : CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
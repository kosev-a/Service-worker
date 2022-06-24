addEventListener('install', event => {
    event.waitUntil(
        caches.open('offline')
            .then(cache => {
                return cache.addAll([
                    '/',
                    '/service-worker.html'
                ]);
            })
    );
});

addEventListener('fetch', event => {
    event.respondWith(new Promise(async (resolve, reject) => {
        const request = event.request;

        try {
            const storage = await caches.open('offline');
            const cache = await storage.match(request);

            if(cache) {
                resolve(cache);
            } else {
                const response = await fetch(request);
                resolve(response);
            }
        } catch (e) {
            reject(e);
        }
    }));
});
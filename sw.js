self.addEventListener('install', (event) => {
    console.log('serviceWorker is installing');
    event.waitUntil(
        caches.open('V2')
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/style.css',
                    '/main.js'
                ])
            }
            )
            .catch((e) => {
                console.log(`error in opening cache ${e}`)
            })
    )
});
self.addEventListener('activate', (event) => {
    let cacheWhiteList = ['V2'];
    console.log('serviceWorker activated')
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheWhiteList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }))
        })
    )

})
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).then((response) => {
                    return caches.open('my cache V1').then((cache) => {
                        cache.put(event.request, response.clone());
                        return response
                    })
                })
            })
            .catch(() => {
                return caches.match('my cache V1')
            })
    );
});


























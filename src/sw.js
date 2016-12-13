/**
 * Created by filipv on 10/12/16.
 */

const VERSION = '1'

const ASSETS = [
    '/',
    '/index.html',
    '/script.js',
    '/snake.js',
    '/sw.js',
    '/icons/icon@96.png',
    '/icons/icon@128.png',
    '/icons/icon@256.png',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.5/p5.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.js',
    '/manifest.json'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('static')
            .then(cache => {
                return cache.addAll(ASSETS)
                    .then(_ => self.skipWaiting())
            })
    )
});

self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim())
});

self.addEventListener('fetch', event => {
    // event.respondWith(
    //     caches.match(event.request)
    //         .then(response => {
    //             return response || fetch(event.request)
    //         })
    // )

    var response;
    event.respondWith(
        caches.match(event.request)
            .catch(_ => fetch(event.request))
            .then(function(r) {
                response = r;
                caches.open('dinamic')
                    .then(function(cache) {
                        cache.put(event.request, response)
                    });
                return response.clone()
            }).catch(function(event) {
                console.log(event, 'broken')
                return caches.match(event.request)
            })
    )
})


// self.oninstall = event => event.waitUntil(async function () {
//     const cache = await caches.open('static')
//
//     await cache.addAll(ASSETS)
//     return self.skipWaiting()
// }())

// self.onactivate = event => event.waitUntil(self.clients.claim())

// function staleWhileRevalidateStrategy() {
//     let fetchedVersion = fetch(event.request),
//         cachedVersion = caches.match(event.request)
//
//     event.respondWith(async function () {
//         const response = Promise.race([
//             fetchedVersion.catch(_ => cachedVersion),
//             cachedVersion
//         ])
//
//         if (!response) {
//             return await fetchedVersion
//         }
//
//         return response
//     })
// }
//
// self.fetch = event => {
//     event.parsedUrl = new URL(event.request.url)
//
//     if (event.parsedUrl.pathname.startsWith('/')) {
//         event.respondWith(caches.match(event.request))
//         return
//     }
//
//     staleWhileRevalidateStrategy()
// }

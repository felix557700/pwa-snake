/**
 * Created by filipv on 10/12/16.
 */

const VERSION = '1'

const ASSETS = [
    '/',
    '/index.html',
    '/script.js',
    '/snake.js',
    '/icons/icon@96.png',
    '/icons/icon@128.png',
    '/icons/icon@256.png'
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
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request)
            })
    )
})

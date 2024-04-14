importScripts('./ngsw-worker.js');

self.addEventListener('install', (event) => {
    console.log("Service Worker installed");
    console.log(event);
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker activated");
    console.log(event);
});

self.addEventListener('sync', (event) => {
    console.log(event);
});

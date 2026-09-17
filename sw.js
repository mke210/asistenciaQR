// Service Worker — Asistencia QR — sin caché, siempre red
const CACHE_VERSION = 'asistencia-qr-v2';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Siempre buscar en red, sin caché.
// (Antes, si la red fallaba, intentaba responder con caches.match(), pero
// como esta app nunca guarda nada en caché eso devolvía "undefined" y
// rompía la carga por completo — "Failed to convert value to Response".
// Ahora simplemente deja pasar la petición a la red, sin intentar un
// respaldo que no existe.)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});

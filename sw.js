// Define un nombre y versión para la caché
const CACHE_NAME = 'presentacion-educativa-v1';
// Lista de archivos para guardar en caché. Usamos rutas relativas.
const urlsToCache = [
  './', // Representa el directorio raíz
  './index.html',
  './manifest.json',
  './images/icon-192x192.png',
  './images/icon-512x512.png'
];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  // Espera hasta que la promesa dentro de waitUntil se complete
  event.waitUntil(
    // Abre la caché con el nombre que definimos
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta y archivos añadidos');
        // Agrega todos los archivos de nuestra lista a la caché
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso
self.addEventListener('fetch', event => {
  // Ignoramos las peticiones que no son GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    // Estrategia: Cache first, then network
    caches.match(event.request)
      .then(cachedResponse => {
        // Si el recurso está en la caché, lo devuelve desde ahí
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en la caché, lo pide a la red
        return fetch(event.request).then(networkResponse => {
           // Opcional: podrías clonar y guardar la nueva respuesta en caché aquí si quisieras
           return networkResponse;
        });
      }
    )
  );
});

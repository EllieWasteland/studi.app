// Define un nombre y versión para la caché
const CACHE_NAME = 'presentacion-educativa-v1';
// Lista de archivos para guardar en caché
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Puedes añadir aquí las URLs de los íconos si quieres
  // '/images/icon-192x192.png',
  // '/images/icon-512x512.png'
];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  // Espera hasta que la promesa dentro de waitUntil se complete
  event.waitUntil(
    // Abre la caché con el nombre que definimos
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta');
        // Agrega todos los archivos de nuestra lista a la caché
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso (un archivo, una imagen, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Busca el recurso en la caché primero
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devuelve desde ahí
        if (response) {
          return response;
        }
        // Si no está en la caché, lo pide a la red
        return fetch(event.request);
      }
    )
  );
});

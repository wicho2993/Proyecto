self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/assets/icon/notification-icon.png', // Asegúrate de tener un icono adecuado
          // Aquí puedes agregar más recursos estáticos que quieras almacenar en caché
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
  });
  
  self.addEventListener('push', function (event) {
    let options = {
      body: event.data ? event.data.text() : 'Nueva notificación',
      icon: '/assets/icon/notification-icon.png', // Asegúrate de tener un icono adecuado
      badge: '/assets/icon/notification-badge.png', // Badge opcional para notificación
      actions: [
        {
          action: 'open',
          title: 'Abrir app',
        },
      ],
    };
  
    event.waitUntil(
      self.registration.showNotification('Notificación Push', options)
    );
  });
  
  // Manejo de clic en la notificación
  self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // Cierra la notificación al hacer clic
  
    // Dependiendo de la URL que desees abrir en la app, puedes personalizar esta parte.
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Si ya hay una ventana abierta, la activa
        for (let client of clientList) {
          if (client.url === '/tabs/tab2' && 'focus' in client) {
            return client.focus();
          }
        }
        // Si no hay ventana abierta, abre una nueva
        if (clients.openWindow) {
          return clients.openWindow('/tabs/tab2');
        }
      })
    );
  });
  
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Verificar si estamos en un entorno de producción
if (environment.production) {
  enableProdMode(); // Habilitar el modo de producción para mejorar el rendimiento
  // Registrar el Service Worker si el navegador lo soporta y estamos en producción
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('ngsw-worker.js') // Este es el nombre por defecto del worker de Angular
      .then(registration => {
        console.log('Service Worker registrado con éxito: ', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker: ', error);
      });
  }
}

// Iniciar la aplicación Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

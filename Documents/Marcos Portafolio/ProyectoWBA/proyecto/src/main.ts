import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  if ('serviceWorker' in navigator && !location.hostname.includes('localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/ngsw-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful:', registration);
        })
        .catch(err => {
          console.error('ServiceWorker registration failed:', err);
        });
    });
  } else {
    console.warn('Service Worker no funciona en localhost con ionic serve.');
  }
  

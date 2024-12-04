import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.registerServiceWorker();
    this.requestNotificationPermission();
  }

  /**
   * Registrar el Service Worker personalizado
   */
  private registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/custom-sw.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error);
        });
    } else {
      console.error('Service Worker no es compatible con este navegador.');
    }
  }

  /**
   * Solicitar permiso para mostrar notificaciones
   */
  private async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.error('Las notificaciones no son compatibles con este navegador.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      switch (permission) {
        case 'granted':
          console.log('Permiso de notificaciones otorgado.');
          this.showTestNotification();
          break;

        case 'denied':
          console.warn('Permiso de notificaciones denegado.');
          break;

        default:
          console.warn('Permiso de notificaciones no respondido.');
      }
    } catch (error) {
      console.error('Error al solicitar el permiso de notificaciones:', error);
    }
  }

  /**
   * Mostrar una notificación de prueba si el permiso es otorgado
   */
  private showTestNotification() {
    if ('Notification' in window) {
      const options = {
        body: 'Esta es una notificación de prueba.',
        icon: 'assets/icon/icon.png', // Cambia el icono si es necesario
      };

      new Notification('Hola desde Ionic!', options);
    } else {
      console.error('Las notificaciones no son compatibles con este navegador.');
    }
  }
}

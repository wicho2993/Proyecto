import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';  // Importamos Leaflet para el mapa
import 'leaflet-routing-machine';  // Si necesitas agregar rutas
import { LocalNotifications } from '@capacitor/local-notifications';  // Importamos el plugin de notificaciones locales

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private navController: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadMap();  // Asegurarse de que el DOM esté listo
    }, 0);
  }

  // Método para manejar la navegación al hacer clic en los elementos del menú
  navigateTo(page: string) {
    if (page === 'home') {
      this.navController.navigateForward('/tabs/tab1');
    } else if (page === 'about') {
      this.navController.navigateForward('/tabs/tab2');
    } else if (page === 'contact') {
      this.navController.navigateForward('/tabs/tab3');
    }
  }

  // Método para cargar el mapa
  loadMap() {
    const mapElement = document.getElementById('map');
    const location = { lat: 19.432608, lng: -99.133209 }; // Ciudad de México

    const map = mapElement ? L.map(mapElement).setView([location.lat, location.lng], 13) : null;

    if (map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([location.lat, location.lng]).addTo(map)
        .bindPopup('<b>Tu ubicación</b>')
        .openPopup();

      // Método para obtener hospitales cercanos
      this.getNearbyHospitals(map, location);
    } else {
      console.error('Elemento del mapa no encontrado');
    }
    this.getNearbyHospitals(map, location);
  }

  // Método para obtener hospitales cercanos
  getNearbyHospitals(map: any, location: any) {
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000, ${location.lat}, ${location.lng});
        way["amenity"="hospital"](around:5000, ${location.lat}, ${location.lng});
        relation["amenity"="hospital"](around:5000, ${location.lat}, ${location.lng});
      );
      out body;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.elements.forEach((hospital: any) => {
          const lat = hospital.lat || hospital.center.lat;
          const lon = hospital.lon || hospital.center.lon;
          L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${hospital.tags.name}</b><br>Hospital`)
            .openPopup();
        });
      })
      .catch((error) => {
        console.error('Error al cargar hospitales:', error);
      });
  }

  // Función para mostrar una notificación local
  async showNotification() {
    await LocalNotifications.requestPermissions();  // Solicitar permisos para las notificaciones

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '¡Notificación!',
          body: 'Esta es una notificación local.',
          id: 1,
          schedule: { at: new Date(new Date().getTime() + 1000) },  // La notificación se muestra 1 segundo después
         
         
        }
      ]
    });
  }

  logout() {
    // Aquí puedes realizar la lógica para cerrar la sesión (Firebase, localStorage, etc.)
    console.log("Sesión cerrada");
    this.navController.navigateRoot('/login'); // Redirigir a la página de login
  }
}

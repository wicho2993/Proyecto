import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  weatherData: any = null;
  cityName: string = '';
  temperatureMessage: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.requestNotificationPermission();
  }

  // Solicita permiso para notificaciones locales
  private async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.error('Este navegador no soporta notificaciones.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Permiso de notificaciones concedido.');
      } else {
        console.warn('Permiso de notificaciones denegado o no respondido.');
      }
    } catch (error) {
      console.error('Error al solicitar permiso de notificaciones:', error);
    }
  }

  // Obtiene el clima de una ciudad
  async getWeather() {
    const API_KEY = 'c167433c8dcd6cee640b408fff1233be';

    if (!this.cityName) {
      await this.showToast('Por favor ingrese una ciudad.', 'warning');
      return;
    }

    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${API_KEY}`)
      .then((geoResponse) => {
        const location = geoResponse.data[0];
        if (!location) {
          this.showToast('No se pudo encontrar la ciudad ingresada.', 'danger');
          return;
        }

        const { lat, lon } = location;
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
      })
      .then(async (weatherResponse) => {
        this.weatherData = weatherResponse?.data;

        const temperature = this.weatherData.main.temp;
        if (temperature > 30) {
          this.temperatureMessage = 'No es recomendable visitar, hace demasiado calor.';
        } else if (temperature < 20) {
          this.temperatureMessage = 'Hace mucho frío, ¡lleva un abrigo!';
        } else {
          this.temperatureMessage = 'El clima es ideal para visitar.';
        }

        await this.showToast('Datos del clima obtenidos correctamente.', 'success');

        // Mostrar notificación local
        this.showLocalNotification(
          `Clima en ${this.weatherData.name}`,
          `Temperatura: ${temperature} °C. ${this.temperatureMessage}`
        );
      })
      .catch(async (error) => {
        console.error('Error:', error);
        await this.showToast('No se pudo obtener el clima para la ciudad ingresada.', 'danger');
      });
  }

  // Muestra una notificación local
  private showLocalNotification(title: string, body: string) {
    if (!('Notification' in window)) {
      console.error('Las notificaciones no son compatibles con este navegador.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/assets/icon/notification-icon.png', // Cambia el icono según tus necesidades
      });
    } else {
      console.warn('No se puede mostrar la notificación porque no se ha concedido el permiso.');
    }
  }

  // Muestra un mensaje en la UI
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
    });
    toast.present();
  }

  // Navega a Tab 3
  goToTab3() {
    this.router.navigate(['/tabs/tab3']);
  }
}

import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'; // Importa el router para la navegación

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currencyData: any;
  country: string = '';

  constructor(private router: Router) {} // Inyecta el router

  getExchangeRate() {
    if (!this.country) {
      alert('Por favor, ingresa un país.');
      return;
    }

    // Llama a la API para obtener la moneda del país
    const url = `https://restcountries.com/v3.1/name/${this.country}`;

    axios.get(url)
      .then(response => {
        const countryData = response.data[0];
        const currencyCode = Object.keys(countryData.currencies)[0]; // Obtener el código de la moneda

        // Llama a la API para obtener el tipo de cambio de la moneda extranjera a MXN
        return axios.get(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`)
          .then(exchangeResponse => {
            const exchangeRateToMXN = exchangeResponse.data.rates.MXN; // Obtiene el tipo de cambio de esa moneda a MXN
            this.currencyData = {
              rate: exchangeRateToMXN,
              code: currencyCode
            };
            console.log(this.currencyData);
          });
      })
      .catch(error => {
        console.error('Error fetching exchange rate data:', error);
        alert('No se pudo obtener el tipo de cambio.');
      });
  }

  // Función para navegar a Tab 2
  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}

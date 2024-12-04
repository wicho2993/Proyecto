import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  searchQuery: string = '';
  searchResults: any[] = []; 
  currentTrack: HTMLAudioElement | null = null; 
  isPlaying: boolean = false; 
  currentlyPlayingUrl: string | null = null; 
  accessToken: string = ''; // Token de acceso de Spotify
  isLoggedIn: boolean = false; // Nueva variable para rastrear el estado de inicio de sesión
  recommendations: any[] = []; // Recomendaciones de canciones

  constructor(private router: Router) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      this.getAccessToken(code); 
    }
  }

  // Iniciar sesión en Spotify
  loginWithSpotify() {
    const CLIENT_ID = 'c26e9270395f4968a65a0cbe31e328d2';
    const REDIRECT_URI = 'http://localhost:8100/tabs/tab3'; // Redirige a tab3
    const SCOPES = 'user-top-read';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
  }

  // Obtener token de acceso con el código de autorización
  async getAccessToken(code: string) {
    const CLIENT_ID = 'c26e9270395f4968a65a0cbe31e328d2';
    const CLIENT_SECRET = '71f9eeb777504f40bfd56cac4ecb19da';
    const REDIRECT_URI = 'http://localhost:8100/tabs/tab3'; // Redirige a tab3

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      this.isLoggedIn = true; 
      this.getRecommendations(); 
    } catch (error) {
      console.error('Error obteniendo el token de acceso:', error);
    }
  }

  
  async getRecommendations() {
    try {
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: {
          seed_genres: 'pop', 
          limit: 10
        }
      });

      this.recommendations = response.data.tracks;
      console.log('Recomendaciones:', this.recommendations);
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
    }
  }


  async searchSongs() {
    if (!this.searchQuery) {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: {
          q: this.searchQuery,
          type: 'track',
          limit: 10
        }
      });

      this.searchResults = response.data.tracks.items;
      console.log('Resultados de búsqueda:', this.searchResults);
    } catch (error) {
      console.error('Error buscando canciones:', error);
      alert('No se pudieron encontrar las canciones.');
    }
  }

  // Función para reproducir y pausar la vista previa
  playPausePreview(url: string) {
    if (this.currentTrack && this.currentlyPlayingUrl === url && this.isPlaying) {
      this.currentTrack.pause();
      this.isPlaying = false;
    } else {
      if (this.currentTrack && this.isPlaying) {
        this.currentTrack.pause();
      }
      this.currentTrack = new Audio(url);
      this.currentTrack.play();
      this.isPlaying = true;
      this.currentlyPlayingUrl = url;
    }
  }
}

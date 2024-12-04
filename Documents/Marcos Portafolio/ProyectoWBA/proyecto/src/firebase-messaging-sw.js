import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDNzH9_0VrAGGd7szfyfDEo3dKAP75kLHg',
  authDomain: 'ionic-2a568.firebaseapp.com',
  projectId: 'ionic-2a568',
  storageBucket: 'ionic-2a568.appspot.com',
  messagingSenderId: '156234332781',
  appId: '1:156234332781:web:438d1ca4d647c04e4e1d64',
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Messaging
const messaging = getMessaging(app);

// Solicitar permiso para recibir notificaciones
const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: '2nmx4O7zJ3FqjZbNpI7JDUYzlSNl4PLorjrUo0kQEiU',
    });
    
    if (token) {
      console.log('Token de notificación:', token);
      // Envía el token a tu backend para guardar y enviar notificaciones
    } else {
      console.log('No se obtuvo el token.');
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
};

// Escuchar los mensajes en primer plano
const listenForForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log('Mensaje en primer plano:', payload);
    // Aquí puedes mostrar una notificación en la UI si lo deseas
  });
};

// Llamar a estas funciones al iniciar tu aplicación o componente
requestPermission();
listenForForegroundMessages();

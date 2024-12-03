import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación
    private navController: NavController
  ) {}

  async onLogin() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.username,
        this.password
      );
      console.log('Login exitoso:', userCredential);
      // Redirige a la página principal
      this.navController.navigateForward('/tabs/tab1');
    } catch (error) {
      console.error('Error en login:', error);
      alert('Usuario o contraseña incorrectos.');
    }
  }
}

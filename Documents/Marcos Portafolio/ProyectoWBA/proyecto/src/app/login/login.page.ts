import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; // Se espera que el usuario ingrese un correo electrónico completo
  password: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    // Asegúrate de que el email ingresado sea válido
    if (!this.isValidEmail(this.username)) {
      this.errorMessage = 'El correo electrónico ingresado no es válido.';
      console.log(this.username);
      return;
    }

    try {
      // Usa el correo ingresado directamente en Firebase Authentication
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.username,
        this.password
      );
      console.log('Login exitoso:', userCredential);
      this.router.navigate(['/tabs']);
    } catch (error) {
      this.errorMessage = 'Error en el login: Verifica tus credenciales';
      console.error('Error en el login:', error);
    }
  }

  async register() {
    // Asegúrate de que el email ingresado sea válido
    if (!this.isValidEmail(this.username)) {
      this.errorMessage = 'El correo electrónico ingresado no es válido.';
      return;
    }

    try {
      // Usa el correo ingresado directamente para el registro
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.username,
        this.password
      );
      console.log('Registro exitoso:', userCredential);
      this.router.navigate(['/tabs']);
    } catch (error) {
      this.errorMessage = 'Error en el registro: El usuario ya existe o los datos son inválidos';
      console.error('Error en el registro:', error);
    }
  }

  private isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    return re.test(email);
  }
}

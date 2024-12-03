import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  username: string = ''; // Almacena el correo electrónico
  password: string = ''; // Almacena la contraseña
  agreed: boolean = false; // Indica si los términos han sido aceptados

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación de Firebase
    private router: Router // Para la navegación
  ) {}

  // Método llamado al enviar el formulario de registro
  async onSubmit() {
    if (this.agreed) {
      try {
        // Crear el usuario con Firebase Authentication
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(
          this.username,
          this.password
        );
        console.log('Registro exitoso:', userCredential);

        // Redirigir al usuario a la página de login
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.error('Error en registro:', error);

        // Manejo de errores comunes
        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado.');
        } else if (error.code === 'auth/weak-password') {
          alert('La contraseña es muy débil. Intenta con al menos 6 caracteres.');
        } else if (error.code === 'auth/invalid-email') {
          alert('El correo ingresado no es válido.');
        } else {
          alert('Hubo un error al crear tu cuenta. Por favor, intenta de nuevo.');
        }
      }
    } else {
      alert('Debes aceptar los términos y condiciones.');
    }
  }

  // Cambiar el estado de aceptación de términos y condiciones
  setCheck() {
    this.agreed = !this.agreed;
  }
}

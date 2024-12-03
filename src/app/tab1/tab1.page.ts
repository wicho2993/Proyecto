import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa Firebase Auth

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  // Lista de usuarios simulada
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'María Gómez', email: 'maria.gomez@example.com' },
    { id: 3, nombre: 'Carlos Martínez', email: 'carlos.martinez@example.com' },
  ];

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación
    private router: Router,
    private navController: NavController
  ) {}

  navigateToNuevaPagina() {
    this.router.navigate(['/tabs/tab1/nuevaPagina']);
  }

  navigateTo(page: string) {
    if (page === 'home') {
      this.navController.navigateForward('/tabs/tab1');
    } else if (page === 'about') {
      this.navController.navigateForward('/tabs/tab2');
    } else if (page === 'contact') {
      this.navController.navigateForward('/tabs/tab3');
    }
  }

  // Función para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut(); // Llama a Firebase para cerrar sesión
      this.router.navigate(['/login']); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  editarUsuario(user: any) {
    console.log(`Editar usuario: ${user.nombre}`);
  }

  cambiarContrasena(user: any) {
    console.log(`Cambiar contraseña para: ${user.nombre}`);
  }

  eliminarUsuario(user: any) {
    console.log(`Eliminar usuario: ${user.nombre}`);
    this.usuarios = this.usuarios.filter((u) => u.id !== user.id);
  }
}

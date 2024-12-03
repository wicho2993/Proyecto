import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat'; // Importar AngularFire
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Módulo de autenticación
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Módulo de Realtime Database
import { environment } from '../environments/environment'; // Configuración de Firebase

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializar Firebase con Realtime Database
    AngularFireAuthModule, // Módulo de autenticación
    AngularFireDatabaseModule, // Módulo de Realtime Database
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Registrar el ServiceWorker después de 30 segundos o cuando la app esté estable
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

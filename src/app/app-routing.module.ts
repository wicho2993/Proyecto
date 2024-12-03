import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirigir a la página de login al iniciar la app
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)  // Asegúrate de que la ruta de las tabs sea correcta
  },
  {
    path: 'nueva-pagina',
    loadChildren: () => import('./pages/tab1/nueva-pagina/nueva-pagina.module').then( m => m.NuevaPaginaPageModule)
  },
  {
    path: 'nueva-pagina',
    loadChildren: () => import('./nueva-pagina/nueva-pagina.module').then( m => m.NuevaPaginaPageModule)
  },
  // Otras rutas adicionales si es necesario
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

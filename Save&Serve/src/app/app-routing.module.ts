import { NgModule } from '@angular/core';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'articles', loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent) }, 
  { path: 'suscription', loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent) },
  { path: 'empresas', loadComponent: () => import('./pages/empresas/empresas.component').then(m => m.EmpresasComponent) },
  { path: 'zonaAdmin', loadComponent: () => import('./pages/zona-admin/zona-admin.component').then(m => m.ZonaAdminComponent) },
  { path: 'gestionArticulos', loadComponent: () => import('./pages/gestion-articulos/gestion-articulos.component').then(m => m.GestionArticulosComponent) },
  { path: 'pasarelaPago', loadComponent: () => import('./pages/pasarela-pago/pasarela-pago.component').then(m => m.PasarelaPagoComponent) },



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

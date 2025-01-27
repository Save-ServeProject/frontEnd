import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {path: 'articles', component: ArticlesComponent}, 
  {path: 'suscription', component: SubscriptionComponent}, 
  {path: 'empresas', component: EmpresasComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

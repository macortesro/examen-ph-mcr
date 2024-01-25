import { RouterModule, Routes } from '@angular/router';
import { CreacionPage } from './paginas/creacion/creacion.page';
import { NgModule } from '@angular/core';
import { Capacitor } from '@capacitor/core';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'creacion',
    component: CreacionPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


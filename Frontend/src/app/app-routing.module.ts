import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MotosComponent } from './pages/motos/motos.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'home' },
  {data: {id: 0}, path: 'home', component: HomeComponent },  
  {data: {id: 1}, path: 'motos', component: MotosComponent },
  {data: {id: 2}, path: 'coches', component: HomeComponent },
  {data: {id: 3}, path: 'comparador', component: HomeComponent },
  {data: {id: 4}, path: 'marcas', component: HomeComponent },
  {path: 'favoritos', component: HomeComponent },
  {path: 'anuncios', component: HomeComponent },
  {path: '**', redirectTo: 'home' }
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

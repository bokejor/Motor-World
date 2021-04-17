import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent },  
  {path: 'motos', component: HomeComponent },
  {path: 'coches', component: HomeComponent },
  {path: 'comparador', component: HomeComponent },
  {path: 'marcas', component: HomeComponent },
  {path: 'favoritos', component: HomeComponent },
  {path: 'anuncios', component: HomeComponent },
  {path: '**', pathMatch:'full', redirectTo: 'home' }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

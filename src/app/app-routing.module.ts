import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { PetModuleModule } from './pet-module/pet-module.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {path: 'home',
  loadChildren: () => import('./home/home.module').then(
    m => m.HomeModule
  )},
  {path: 'pet',
  loadChildren: () => import('./pet-module/pet-module.module').then(
    m => m.PetModuleModule
  )},
  {path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(
    m => m.AuthModule
  )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

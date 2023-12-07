import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { PetModuleModule } from './pet-module/pet-module.module';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    // PetModuleModule,
    // HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

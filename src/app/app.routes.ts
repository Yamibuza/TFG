import { Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  //Rutas que NO necesitan autenticación
  // { path: '', component: LobbyComponent, canActivate: [AuthGuard], data: {requiresAuth : false}},
  { path: '', component: LoginComponent, canActivate: [AuthGuard], data: {requiresAuth : false}},


  //Rutas que Sí necesitan autenticación
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], data: {requiresAuth : true}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {requiresAuth : true}},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {requiresAuth : true}},

  //Rutas globales
  // { path: 'contact', component: ContactComponent},


  //Ruta por defecto
  { path: '**', component: LoginComponent , canActivate: [AuthGuard], data: {requiresAuth : false}},

];

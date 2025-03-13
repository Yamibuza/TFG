import { Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [

  { path: '', component: LobbyComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
  { path: '**', component: LobbyComponent},

];

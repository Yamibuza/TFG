import { Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  { path: 'home', component: LobbyComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LobbyComponent},

];

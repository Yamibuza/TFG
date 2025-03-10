import { Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [

  { path: '', component: LobbyComponent },
  { path: 'foot', component: FooterComponent },

];

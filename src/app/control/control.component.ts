import { Component } from '@angular/core';
import { UserControlComponent } from "./user-control/user-control.component";

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [UserControlComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent {

componenteSeleccionado = '';

}

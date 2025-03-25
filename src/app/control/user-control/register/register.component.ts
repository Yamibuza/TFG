import { Component } from '@angular/core';
import { RepeatPipe } from '../../../pipes/repeat.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RepeatPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  iSelect = 9;
}

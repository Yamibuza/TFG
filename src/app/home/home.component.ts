import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username = '';
  role = '';

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || '';
    this.role = user.rol || '';
  }
}

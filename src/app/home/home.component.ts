import { Component } from '@angular/core';
import { UserListComponent } from "../compartidos/user-list/user-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserListComponent],
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

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLogged = false;
  username: string = '';

  constructor(private authService : AuthService) {}

  ngOnInit(){

    this.authService.isLoggedIn().subscribe(

      isAuth =>{
        this.isLogged = isAuth;

        if (isAuth){

          const user = JSON.parse(localStorage.getItem('user') || '{}');
          this.username = user.username || '';
        }
      }
    )
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLogged = false;
  username = '';

  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(){

    this.authService.isLoggedIn().subscribe(

      isAuth =>{
        this.isLogged = isAuth;

        if (isAuth){

          const user = JSON.parse(localStorage.getItem('user') || '{}');
          this.username = user.username || '';

        }else{

          alert('Debes iniciar sesión para acceder a esta página');
          this.router.navigate(['/lobby']);
        }
      }
    )
  }
}

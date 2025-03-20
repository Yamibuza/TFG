import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFG-App';
  isLogged = false;
  user = null;

    constructor(private authService: AuthService) {}

    ngOnInit() {
      this.authService.isLoggedIn().subscribe((isAuth) => {
        this.isLogged = isAuth;

        if (isAuth) {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          this.user = user;
        }
      });
    }
}


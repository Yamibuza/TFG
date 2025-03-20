import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  username: string = '';
  dropdownOpen: boolean = false;

  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isAuth) => {

      if (isAuth) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.username = user.username || '';
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    if (confirm('Seguro que deseas cerrar la sesión?')) {

      this.dropdownOpen = false;// Para cerrar menú al cerrar sesión y que no se nos quede abierto en la trasición al

      //El then sirve para que primero nos redirija y luego cierre la sesión.
      // Esto evita problemas de autenticación en las páginas que requieren estar autenticado para visualizarlas
      //**!! Por algun motivo no funciona, */
      this.authService.logout();

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 100);

    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.dropdownOpen = false;
    }
  }
}

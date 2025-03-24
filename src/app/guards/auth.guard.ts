
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private alertShown = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {

    const requiresAuth = route.data?.['requiresAuth'];

    return this.authService.isLoggedIn().pipe(
      take(1),
      map(isAuth => {
        if (requiresAuth && !isAuth) {
          if (!this.alertShown) {
            this.alertShown = true;
            alert('Debes iniciar sesión para acceder a esta página');
            this.router.navigate(['/']).then(() => (this.alertShown = false));
          }
          return false; // ⛔ Evitar que la ruta cargue
        }

        if (!requiresAuth && isAuth) {
          return this.router.parseUrl('/dashboard'); // ⛔ Redirigir sin bloquear la navegación
        }

        return true; // ✅ Permitir navegación
      })
    );
  }
}


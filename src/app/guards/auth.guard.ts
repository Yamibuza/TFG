/* import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private alertShown = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    // Leemos el parámetro de la ruta, que será true si requiere autenticación y false en el caso de que no
    const requiresAuth = route.data?.['requiresAuth'];


    return this.authService.isLoggedIn().pipe(
      take(1),
      tap(isAuth => {
        if (requiresAuth && !isAuth) {
          // Si la ruta requiere autenticación y el usuario no está autenticado mostramos el alert (solo una vez con alertShown)
          // y devolvemos a lobby (que es la página por defecto antes de loguearse)
          if (!this.alertShown) {
            this.alertShown = true;
            alert('Debes iniciar sesión para acceder a esta página');
            this.router.navigate(['/lobby']).then(() => (this.alertShown = false));
          }
        } else if (!requiresAuth && isAuth) {
          // Si la ruta NO debe ser accesible por usuarios autenticados (para casos como login o lobby)lo devolvemos a home
          // (como ya está autenticado no habrá problema)
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
*/

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


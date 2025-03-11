import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/jv_tfg/api';
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login.php`, { email, password })
      .pipe(
        tap((response) => {
          if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.authState.next(true);
          }
        })
      );
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/logout.php`).subscribe(() => {
      localStorage.removeItem('user');
      this.authState.next(false);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  checkSession(): void {
    this.http
      .get<any>(`${this.apiUrl}/checkSession.php`)
      .subscribe((response) => {
        if (response.loggedIn) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authState.next(true);
        }
      });
  }
}

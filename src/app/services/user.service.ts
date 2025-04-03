import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

// Puedes mover esta interfaz a un archivo models/usuario.model.ts si quieres
// export interface Usuario {
//   username: string;
//   email: string;
//   password: string;
//   rol: 'admin' | 'user';
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/jv_tfg/api'; // Ajusta si usas otro path

  constructor(private http: HttpClient) {}

  // De momento no se usa porque register.php solo recibe arrays aunque sea un array de 1 solo elemento (caso de registrar solo 1 usuario)
  /* createUser(user: Usuario): Observable<any> {
     return this.http.post(`${this.apiUrl}/register.php`, user);
  }*/

  crearUsers(users: Usuario[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, users);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/get_users.php`);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_user.php?email=${email}`);
  }

  updateUser(user: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_user.php`, user);
  }
}

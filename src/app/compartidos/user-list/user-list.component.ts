import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../../control/user-control/register/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input() mode: 'simple' | 'admin' = 'simple';
  @Input() usuarios: Usuario[] = [];

  usuarioEnEdicion: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Si no se pasan usuarios desde fuera, los carga él mismo
    if (this.usuarios.length === 0) {
      this.userService.getUsers().subscribe((res) => {
        this.usuarios = res;
      });
    }
  }

  iniciarEdicion(usuario: string): void {
    this.usuarioEnEdicion = this.usuarioEnEdicion === usuario ? null : usuario;
  }

  actualizarUsuario(usuarioActualizado: Usuario): void {
    this.userService.updateUser(usuarioActualizado).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.usuarioEnEdicion = null;

        // Refrescar usuarios si quieres
        this.userService.getUsers().subscribe((res) => {
          this.usuarios = res;
        });
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('No se ha podido actualizar el usuario');
      },
    });
  }

  eliminarUsuario(username: string): void {
    if (confirm(`¿Seguro que deseas eliminar al usuario ${username}?`)) {
      this.userService.deleteUser(username).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.usuarioEnEdicion = null;
          this.userService.getUsers().subscribe((res) => {
            this.usuarios = res;
          });
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          alert('No se ha podido eliminar el usuario');
        },
      });
    }
  }
}

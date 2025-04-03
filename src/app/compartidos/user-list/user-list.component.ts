import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input() mode: 'simple' | 'admin' = 'simple';
  @Input() usuarios: Usuario[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Si no se pasan usuarios desde fuera, los carga él mismo
    if (this.usuarios.length === 0) {
      this.userService.getUsers().subscribe((res) => {
        this.usuarios = res;
      });
    }
  }
}

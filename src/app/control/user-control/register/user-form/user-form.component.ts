import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() usuario?: Usuario;

  @Output() cancelar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<Usuario>();

  private usernameOriginal = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Si se recibe un usuario (estamos editando usuarios), asignamos una variable con el username inicial de la fila
    // devuelta como usuario para utilizarlo en las consultas
    if(this.usuario){

      this.usernameOriginal = this.usuario.username;
    }
    // Si no se recibe un formGroup, creamos un formulario con datos de usuario
    if (!this.formGroup) {
      this.formGroup = this.fb.group({
        nombre: [this.usuario?.username || '', []],
        email: [this.usuario?.email || '', []],
        password: ['', []],
        rol: [this.usuario?.rol || '', []],
      });
    }
  }

  guardar(): void {
      if (this.formGroup.valid) {
        const data = {
          username: this.formGroup.value.nombre,
          email: this.formGroup.value.email,
          password: this.formGroup.value.password,
          rol: this.formGroup.value.rol,
          usernameOriginal: this.usernameOriginal,
        };

        this.guardado.emit(data);
      }
    }

  cancelarEdicion(): void {
    this.cancelar.emit();
  }
}

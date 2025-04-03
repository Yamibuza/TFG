import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RepeatPipe } from '../../../pipes/repeat.pipe';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepeatPipe,
    UserFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  valueSelect: number = 1;
  formArray!: FormArray<FormGroup>;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.formArray = this.fb.array<FormGroup>([]);
    this.updateFormArray(this.valueSelect);
  }

  updateFormArray(count: number): void {
    this.formArray.clear();
    for (let i = 0; i < count; i++) {
      this.formArray.push(
        this.fb.group({
          nombre: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          rol: ['', [Validators.required],]
          // puedes añadir más campos
        })
      );
    }
  }

  onChangeSelect(): void {
    this.updateFormArray(this.valueSelect);
  }

  /* submit(): void {
    if (this.formArray.valid) {
      console.log(this.formArray.value); // Aquí enviaríamos al backend
    } else {
      this.formArray.markAllAsTouched();
    }
  } */

  submit(): void {
    if (this.formArray.valid) {
      const usuarios: Usuario[] = this.formArray.value.map((form) => ({
        username: form.nombre,
        email: form.email,
        password: form.password,
        rol: form.rol
      }));

      this.userService.crearUsers(usuarios).subscribe({
        next: (res) => {
          console.log('Registro exitoso ->', res);

          if(usuarios.length === 1){

            alert('Usuario registrado correctamente');
          }else{

            alert('Usuarios registrados correctamente');
          }

          this.updateFormArray(this.valueSelect = 1);
        },
        error: (err) => {
          console.error('Error en el registro ->', err);
          alert('Error en el registro');
        }
      });
    } else {
      this.formArray.markAllAsTouched();
    }
  }
}

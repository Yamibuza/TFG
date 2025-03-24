import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage: string = '';

  constructor(private authService: AuthService, private router : Router) {}

  login() {

    if (this.loginForm.valid) {

      const username = this.loginForm.value.username ?? '';
      const password = this.loginForm.value.password ?? '';

      this.authService.login(username, password).subscribe(response => {
        if (!response.success) {

          this.errorMessage = response.message;
        }else{

          this.router.navigate(['/dashboard']);
        }
      });

    }
  }
}

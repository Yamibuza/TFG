import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login() {
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (emailValue && passwordValue) {
      this.authService.login(emailValue, passwordValue).subscribe(response => {
        if (!response.success) {
          this.errorMessage = response.message;
        }
      });
    }
  }

}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);

  onSubmit() {
    if (!this.authService.login(this.email, this.password)){
      this.errorMessage = 'Login ou senha incorretos!'
    }
  }
}

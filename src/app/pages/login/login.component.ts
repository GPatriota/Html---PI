import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  identifier = ''; 
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.identifier, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Usuário, email, CPF ou senha inválidos';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <form (ngSubmit)="onSubmit()" class="login-form">
        <h2>Bem vindo de volta!</h2>
        
        <div class="form-group">
          <label for="username">Usuário</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username"
            name="username"
            required
            placeholder="Digite seu usuário" 
          />
        </div>
        
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            required
            placeholder="Digite sua senha" 
          />
        </div>
        
        <button type="submit">Login</button>
        
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`
    
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; 
      background: linear-gradient(135deg, #667eea, #764ba2); 
      padding: 20px;
    }
    
   
    .login-form {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
      max-width: 400px;
      text-align: center; 
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #333;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }
    
    button {
      width: 100%;
      padding: 0.85rem;
      background: #4c51bf;
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease-in-out;
    }
    
    button:hover {
      background: #3730a3;
    }
    
    .error {
      color: red;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Usuário ou senha incorretos.';
    }
  }
}
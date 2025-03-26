import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <form (ngSubmit)="onSubmit()" class="register-form">
        <h2>Create Your Account</h2> 
        
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username"
            name="username"
            required
            placeholder="Choose a username"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            [(ngModel)]="cpf"
            name="cpf"
            required
            placeholder="Enter your CPF"
          />
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            [(ngModel)]="dob"
            name="dob"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            required
            placeholder="Enter a password"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            [(ngModel)]="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Re-enter your password"
          />
        </div>
        
        <button type="submit">Register</button>
        
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 20px;
    }
    
    .register-form {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 100%;
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
export class RegisterComponent {
  username = '';
  email = '';
  cpf = '';
  dob = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    
    if (this.authService.register(this.username, this.email, this.cpf, this.dob, this.password)) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Username or email already exists';
    }
  }
}

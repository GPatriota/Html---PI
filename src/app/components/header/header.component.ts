import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="header">
      <nav>
        <a routerLink="/" class="logo">ShoeStore</a>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/products">Products</a>
          <a routerLink="/about">About Us</a>
          <ng-container *ngIf="!(authService.currentUser$ | async)">
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Register</a>
          </ng-container>
          <a *ngIf="authService.currentUser$ | async" (click)="logout()" style="cursor: pointer;">Logout</a>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: #333;
      padding: 1rem;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      color: white;
      font-size: 1.5rem;
      text-decoration: none;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
    }
    .nav-links a:hover {
      color: #ddd;
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
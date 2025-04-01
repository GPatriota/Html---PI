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
          <a routerLink="/">Página Inicial</a>
          <a routerLink="/products">Produtos</a>
          <a routerLink="/about">Sobre nós</a>
          <ng-container *ngIf="!(authService.currentUser$ | async)">
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Registro</a>
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
      width: 100%;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between; 
      width: 100%;
      padding: 0 1rem;
    }
    .logo {
      color: white;
      font-size: 1.5rem;
      text-decoration: none;
      margin: 0;
      padding-left: 0;
      flex: 1; 
    }
      .nav-links {
      display: flex;
  gap: 1rem;
  margin-left: auto; 
  position: relative;
  right: 1rem;
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
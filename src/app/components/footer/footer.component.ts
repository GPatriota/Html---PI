import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-section">
            <h3>Masculino</h3>
            <ul>
              <li><a routerLink="/novidades">Novidades</a></li>
              <li><a routerLink="/products">Tênis</a></li>
              <li><a routerLink="/outlet">Outlet</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Feminino</h3>
            <ul>
              <li><a routerLink="/novidades">Novidades</a></li>
              <li><a routerLink="/products">Tênis</a></li>
              <li><a routerLink="/outlet">Outlet</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Institucional</h3>
            <ul>
              <li><a routerLink="/about">Quem Somos</a></li>
              <li><a routerLink="/trabalhe-conosco">Trabalhe Conosco</a></li>
              <li><a routerLink="/termos">Termos de Uso</a></li>
              <li><a routerLink="/privacidade">Política de Privacidade</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Marcas</h3>
            <ul>
              <li><a routerLink="/nike">Nike</a></li>
              <li><a routerLink="/adidas">Adidas</a></li>
              <li><a routerLink="/puma">Puma</a></li>
              <li><a routerLink="/newbalance">New Balance</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          © 2025 Todos os direitos reservados.
        </div>
      </footer>
    `,
    styles: [`
      .footer {
        background: #333;
        color: white;
        padding: 2rem;
        font-size: 14px;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      .footer-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }
        .footer-section {
        text-align: left; 
      }
      .footer-section h3 {
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: white;
      }
      .footer-section ul {
        list-style: none;
        padding: 0;
        text-align: left;
      }
      .footer-section ul li {
        margin-bottom: 0.5rem;
      }
      .footer-section ul li a {
        color: white;
        text-decoration: none;
        display: block;
      }
      .footer-section ul li a:hover {
        text-decoration: underline;
      }
      .footer-bottom {
        text-align: center;
        margin-top: 2rem;
        border-top: 1px solid #555;
        padding-top: 1rem;
        color: white;
      }
    `]
})
  export class FooterComponent {
    bottomText: string = 'Seu texto de rodapé aqui';
    isAuthenticated: boolean = false;
  
    constructor() {
      this.isAuthenticated = !!localStorage.getItem('authToken');
    }
  
    logout() {
      localStorage.removeItem('authToken');
      this.isAuthenticated = false;
    }
  }
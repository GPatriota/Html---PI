import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <div class="banner">
        <h1>Welcome to ShoeStore</h1>
        <p>Find your perfect pair</p>
      </div>
      
      <div class="brands">
        <h2>Our Brands</h2>
        <div class="brand-logos">
          <div class="brand">Nike</div>
          <div class="brand">Adidas</div>
          <div class="brand">Puma</div>
          <div class="brand">New Balance</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .banner {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&h=400&q=80');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 4rem;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .brands {
      text-align: center;
      margin-top: 2rem;
    }
    .brand-logos {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .brand {
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      font-weight: bold;
    }
  `]
})
export class HomeComponent {}
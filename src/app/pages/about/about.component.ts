import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
    <div class="about">
      <h1>About Us</h1>
      <p>Welcom to ShoeStore, your premier destination for quality footwear. We pride ourselves on offering a curated selection of the world's top shoe brands.</p>
      
      <div class="mission">
        <h2>Our Mission</h2>
        <p>To provide our customers with the best selection of shoes, combining style, comfort, and quality at competitive prices.</p>
      </div>
      
      <div class="values">
        <h2>Our Values</h2>
        <ul>
          <li>Quality First</li>
          <li>Customer Satisfaction</li>
          <li>Authentic Products</li>
          <li>Competitive Pricing</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styles: [`

    .container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea, #764ba2);
        max-width: 100%;
    }

    .about {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      color: #2c5282;
      margin-bottom: 1rem;
    }
    .mission, .values {
      margin-top: 2rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 0.5rem 0;
      padding-left: 1rem;
      border-left: 3px solid #2c5282;
    }
  `]
})
export class AboutComponent {}
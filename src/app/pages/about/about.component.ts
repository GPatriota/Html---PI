import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
    <div class="Sobre nós">
      <h1>Sobre nós</h1>
      <p> É uma empresa criada por um grupo de amigos, dedicada a oferecer os melhores tênis do mercado, combinando design moderno, conforto e alta durabilidade. Nosso compromisso é proporcionar a melhor experiência para nossos clientes.</p>
      
      <div class="Missão">
        <h2>Missão</h2>
        <p>Oferecer aos nossos clientes a melhor seleção de calçados, aliando estilo, conforto e qualidade a preços competitivos.</p>
      </div>

      <div class="Visão">
      <h2>Visão</h2>
      <p> Uma mentalidade focada no coletivo, impulsionada por uma cultura de inovação e um propósito unificado, dedicada a criar um impacto positivo e duradouro.</p>
      
      <div class="Valores">
        <h2>Nossos valores</h2>
        <ul>
          <li>Qualidade em primeiro lugar</li>
          <li>Inovação</li>
          <li>Sustentabilidade</li>
          <li>Confiabilidade</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styles: [`

    .container {
        min-height: 120vh;
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
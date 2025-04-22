import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <div class="about">
      <h1>Sobre nós</h1>
      <p> Uma empresa, dedicada a oferecer os melhores tênis do mercado, combinando design moderno, conforto e alta durabilidade.</p>
      <h3> Nossa História</h3>
      <p> Em 2025, nasceu a shoeStore com um propósito claro: oferecer aos nossos clientes a melhor experiência possível no universo dos tênis.
      Desde o início, adotamos uma abordagem focada na qualidade e sustentabilidade. Nossos produtos são desenvolvidos com materiais de alta performance e tecnologias avançadas, sempre respeitando o meio ambiente e buscando minimizar nosso impacto ecológico.
      <p>Estamos comprometidos em oferecer um atendimento personalizado e acessível, garantindo que cada cliente encontre o tênis ideal para seu estilo e necessidade. </p>
      <div class="Missão">
        <h2>Missão</h2>
        <p>Oferecer aos nossos clientes a melhor seleção de calçados, aliando estilo, conforto e qualidade a preços competitivos.</p>
      </div>

      <div class="vision">
      <h2>Visão</h2>
      <p> Uma mentalidade focada no coletivo, impulsionada por uma cultura de inovação e um propósito unificado, dedicada a criar um impacto positivo e duradouro.</p>
      
      <div class="values">
        <h2>Nossos valores</h2>
        <ul>
          <li>Qualidade em primeiro lugar</li>
          <li>Inovação</li>
          <li>Sustentabilidade</li>
          <li>Confiabilidade</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
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
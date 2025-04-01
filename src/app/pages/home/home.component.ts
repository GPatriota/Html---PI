import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="banner">
        <div class="slides">
          <div class="slide" [class.active]="currentSlide === 0">
            <div class="slide-click-area" (click)="goToProducts('Nike')">
              <img src="/assets/tenis_nike.jpg" alt="Nike" />
              <div class="content">
                <h1>Conforto e estilo para todos os momentos</h1>
              </div>
            </div>
          </div>
          <div class="slide" [class.active]="currentSlide === 1">
            <div class="slide-click-area" (click)="goToProducts('New Balance')">
              <img src="/assets/tenis_new_balance.jpg" alt="New Balance" />
              <div class="content">
                <h1>Desempenho e qualidade que te acompanham</h1>
              </div>
            </div>
          </div>
          <div class="slide" [class.active]="currentSlide === 2">
            <div class="slide-click-area" (click)="goToProducts('Puma')">
              <img src="/assets/tenis_puma.jpg" alt="Puma" />
              <div class="content">
                <h1>O seu próximo passo começa aqui.</h1>
              </div>
            </div>
          </div>
          <div class="slide" [class.active]="currentSlide === 3">
            <div class="slide-click-area" (click)="goToProducts('Adidas')">
              <img src="/assets/tenis_adidas.jpg" alt="Adidas" />
              <div class="content">
                <h1>Sinta a diferença em cada detalhe</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="prev" (click)="changeSlide(-1)">&#10094;</button>
      <button class="next" (click)="changeSlide(1)">&#10095;</button>

      <div class="brands-section">
        <div class="brands-header">
          <h2>MARCAS</h2>
          <p class="subtitle">Um catálogo diverso para você se jogar!</p>
        </div>

        <div class="category">
          <h3>Nossos principais parceiros</h3>
          <div class="brand-logos">
            <div class="brand" (click)="goToProducts('Nike')">
              <img src="assets/nike.svg" alt="Nike" />
              <span>Nike</span>
            </div>
            <div class="brand" (click)="goToProducts('Adidas')">
              <img src="assets/adidas.svg" alt="Adidas" />
              <span>Adidas</span>
            </div>
            <div class="brand" (click)="goToProducts('Puma')">
              <img src="assets/puma.svg" alt="Puma" />
              <span>Puma</span>
            </div>
            <div class="brand" (click)="goToProducts('New Balance')">
              <img src="assets/newbalance.svg" alt="New Balance" />
              <span>New Balance</span>
            </div>

            <div class="brand" (click)="goToProducts('')">
              <span>Todas as Marcas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Arial", sans-serif;
      }

      .container {
        min-height: 200vh;
        background: linear-gradient(135deg, #667eea, #764ba2);
        max-width: 100%;
      }
      .banner {
        position: relative;
        width: 100%;
        height: 60vh;
        min-height: 400px;
        overflow: hidden;
      }

      .slides {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .slide {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 1s ease-in-out;
      }

      .slide.active {
        opacity: 1;
        z-index: 1;
      }

      .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .slide-click-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        cursor: pointer;
      }

      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        z-index: 2;
        width: 100%;
      }
      .content h1 {
        font-size: 3rem;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .prev,
      .next {
        position: absolute;
        top: 50%;
        transform: translateY(-290%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        padding: 7px;
        z-index: 10;
      }

      .prev {
        left: 10px;
      }

      .next {
        right: 10px;
      }

      .prev:hover,
      .next:hover {
        background: rgba(255, 255, 255, 0.7);
        color: black;
      }

      .brands-section {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 2rem;
      }

      .brands-header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .brands-header h2 {
        font-size: 3rem;
        font-weight: bold;
        text-transform: uppercase;
        color: #333;
        margin-bottom: 1rem;
      }

      .brands-header .subtitle {
        font-size: 1.2rem;
        color: #666;
        font-weight: bold;
        font-style: italic;
      }

      .category h3 {
        font-size: 1.8rem;
        color: #222;
        margin-bottom: 1.5rem;
        padding-left: 1rem;
        border-left: 4px solid rgb(107, 255, 119);
      }

      .brand-logos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 2rem;
      }

      .brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .brand:hover {
        background: rgb(190, 191, 192);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .brand img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }

      .brand span {
        font-weight: bold;
        color: #333;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  private slideInterval: any;
  private totalSlides = 4;
  constructor(private router: Router) {}

  goToProducts(brand: string) {
    this.router.navigate(["/products"], { queryParams: { brand } });
  }

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 7000);
  }

  changeSlide(n: number) {
    this.currentSlide =
      (this.currentSlide + n + this.totalSlides) % this.totalSlides;
  }
}

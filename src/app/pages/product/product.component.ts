import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="product-page">
        <img class="image" [src]="product.imageUrl" alt="">
        <div class="product-container">
         <h1 class="product-title">{{product.name}}</h1>

         <div class="stats">
          <span>Code: <b>{{product.id}}</b></span>
          <span>Brand: <b>{{product.brand}}</b></span>
          <span>Gender: <b>{{product.gender}}</b></span>
         </div>

         <p class="product-description">{{product.description}}</p>
         
         <h2 class="product-price">{{"R$" + product.price}}</h2>

         <div class="preferences">
          <div class="color">
            <span>Cores</span>
            <div class="color-options">
            <label class="radio-container">
              <input type="radio" name="color" checked>
              <span class="checkmark" style="background: red;"></span>
            </label>
  
            <label class="radio-container">
              <input type="radio" name="color">
              <span class="checkmark" style="background: gray;"></span>
            </label>
          </div>
          </div>
         
          <div class="size">
            <span>Tamanho</span>
            <div class="select">
              <select>
                <option *ngFor="let size of product.sizes">{{size}}</option>
              </select>
            </div>
          </div>
         </div>
          
          <div class="product-buttons">
          <div class="quantity-selector">
            <button class="btn minus"  (click)="decrement()">−</button>
            <span class="quantity">{{quantity}}</span>
            <button class="btn plus" (click)="increment()">+</button>
          </div>

            <button class="add-to-cart">Add to cart</button>
            
            <button class="buy-now">Buy now</button>
          </div>
    </div>
  `,
  styles: [`
    .product-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
    }
  `]
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    price: 0,
    brand: '',
    imageUrl: '',
    gender: 'unissex',
    description: '',
  };
  quantity = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        const product = this.productService.getProductById(productId);
        if (product) {
          this.product = product;
          return;
        }
        this.router.navigate(['']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
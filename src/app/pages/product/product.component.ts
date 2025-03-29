import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
         </div>

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
                <option>39</option>
                <option>40</option>
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

            <button class="add-to-cart">Add to card</button>
            
            <button class="buy-now">Buy now</button>
          </div>

    </div>
  `,
  styles: [`
    .product-page {
      max-width: 1200px;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 2rem;
      gap: 1rem;
    }

    .image {
      border-radius: 8px;
    }

    .product-container {
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      background: white;
    }

    .product-price {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .product-buttons {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .add-to-cart, .buy-now {
      flex-grow: 1;
      padding: 10px;
      border-radius: 6px;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }

    .add-to-cart {
      background: orange;
      color: white;
    }
    
    .buy-now {
      background: yellow;
      color: black;
    }

    .color {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .color-options {
      display: flex;
      gap: 10px;
    }

    .radio-container {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .radio-container input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .checkmark {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: inline-block;
      border: 2px solid transparent;
      transition: border 0.3s ease;
      opacity: 0.5;
    }

    .radio-container input:checked + .checkmark {
      border: 2px solid orange;
      box-shadow: 0 0 3px rgba(255, 165, 0, 0.6);
      opacity: 1;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 5px 10px;
      width: fit-content;
    }

    .btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 5px 10px;
      color: #333;
    }
    
    .quantity {
      font-size: 16px;
      font-weight: bold;
      margin: 0 10px;
      width: 20px;
      text-align: center;
    }
    
    .btn:focus {
      outline: none;
    }

    .size {
      position: relative;
      display: inline-block;
      width: 100%;
      max-width: 280px;
    }

    .stats {
      display: flex;
      gap: 1rem;
    }

    .preferences {
      display: flex;
      gap: .5rem;
    }

    .select {
      position: relative;
      display: inline-block;
      width: 100%;
      max-width: 280px;
    }

    .select select {
      width: 100%;
      padding: 10px 15px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: white;
      appearance: none;
      cursor: pointer;
    }

    .select::after {
      content: "▼";
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      font-size: 12px;
      color: #333;
      pointer-events: none;
    }
  `]
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    price: 0,
    brand: '',
    imageUrl: ''
  };
  quantity = 0;



  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment(){
    this.quantity++
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        const product = this.productService.getProductById(productId)

        if (product) {
          this.product = product
          return
        }

        this.router.navigate([''])
        return
      }

      this.router.navigate([''])
    });

  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="product-page">
      <div class="filters">
        <img [src]="product.imageUrl" alt="">
        <div>
          <h1>{{product.name}}</h1>
          <h1>{{product.brand}}</h1>
          <h1>{{product.price}}</h1>


        </div>
        <!-- <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="filterProducts()"
          placeholder="Search products..."
          class="search-input"
        />
        
        <select [(ngModel)]="selectedBrand" (change)="filterProducts()" class="brand-select">
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>
      </div>

      <div *ngIf="isAdmin" class="add-product">
        <h3>Add New Product</h3>
        <input [(ngModel)]="newProduct.name" placeholder="Name" />
        <input [(ngModel)]="newProduct.price" type="number" placeholder="Price" />
        <input [(ngModel)]="newProduct.brand" placeholder="Brand" />
        <input [(ngModel)]="newProduct.imageUrl" placeholder="Image URL" />
        <button (click)="addProduct()">Add Product</button>
      </div>

      <div class="products-grid">
        <div *ngFor="let product of filteredProducts" class="product-card">
          <img [src]="product.imageUrl" [alt]="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.brand }}</p>
          <p class="price">{{ product.price | number:'1.2-2' }}</p>
        </div>
      </div> -->
    </div>
  `,
  styles: [`
    .products-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .search-input, .brand-select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }
    .price {
      font-weight: bold;
      color: #2c5282;
    }
    .add-product {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .add-product input {
      display: block;
      margin: 0.5rem 0;
      padding: 0.5rem;
      width: 100%;
      max-width: 300px;
    }
    .add-product button {
      background: #2c5282;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
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

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id');

      if(productId){
        const product = this.productService.getProductById(productId) 
        
        if(product) {
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
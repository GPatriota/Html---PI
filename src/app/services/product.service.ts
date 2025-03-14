import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Air Max 270',
      price: 199.99,
      brand: 'Nike',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&h=300&q=80'
    },
    {
      id: '2',
      name: 'Ultraboost',
      price: 179.99,
      brand: 'Adidas',
      imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=300&h=300&q=80'
    },
    {
      id: '3',
      name: 'RS-X',
      price: 129.99,
      brand: 'Puma',
      imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=300&h=300&q=80'
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  constructor() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
      this.productsSubject.next(this.products);
    } else {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  addProduct(product: Product): void {
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productsSubject.next(this.products);
  }

  getProducts(): Product[] {
    return this.products;
  }
}
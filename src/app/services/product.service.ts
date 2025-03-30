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
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Classic Nike sneaker with air cushioning',
      gender: 'unissex'
    },
    {
      id: '2',
      name: 'Ultraboost',
      price: 179.99,
      brand: 'Adidas',
      imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Premium running shoe with boost technology',
      gender: 'masculino'
    },
    {
      id: '3',
      name: 'RS-X',
      price: 129.99,
      brand: 'Puma',
      imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Retro-inspired sneaker with modern comfort',
      gender: 'feminino'
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

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | null {
    console.log(localStorage.getItem('products'));
    return this.products.find(p => p.id === id) || null;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products));
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productsSubject.next(this.products);
  }
}
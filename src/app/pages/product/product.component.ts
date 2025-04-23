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
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
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

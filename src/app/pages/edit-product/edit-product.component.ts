import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-product-container">
      <h2>Edit Product</h2>
      <form (ngSubmit)="onSubmit(form)" #form="ngForm" class="product-form" *ngIf="product">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="product.name"
            name="name"
            required
            #name="ngModel"
            [class.invalid]="name.touched && name.invalid"
          />
          <div *ngIf="name.touched && name.invalid" class="error-message">
            Name is required.
          </div>
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            id="price"
            [(ngModel)]="product.price"
            name="price"
            required
            #price="ngModel"
            [class.invalid]="price.touched && price.invalid"
          />
          <div *ngIf="price.touched && price.invalid" class="error-message">
            Price is required.
          </div>
        </div>

        <div class="form-group">
          <label for="brand">Brand</label>
          <select id="brand" [(ngModel)]="product.brand" name="brand" required #brand="ngModel" [class.invalid]="brand.touched && brand.invalid">
            <option value="">Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
          </select>
          <div *ngIf="brand.touched && brand.invalid" class="error-message">
            Brand is required.
          </div>
        </div>

        <div class="form-group">
          <label>Tamanhos Disponíveis</label>
          <div class="size-options">
            <label *ngFor="let size of tamanhosDisponiveis">
              <input
                type="checkbox"
                [value]="size"
                (change)="toggleSize(size)"
                [checked]="product?.size.includes(size)"
              />
              {{ size }}
            </label>
          </div>
          <div *ngIf="isSubmitted && product?.size.length === 0" class="error-message">
            Selecione pelo menos um tamanho.
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            [(ngModel)]="product.description"
            name="description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="gender">Gender</label>
          <select
            id="gender"
            [(ngModel)]="product.gender"
            name="gender"
            required
            #gender="ngModel"
            [class.invalid]="gender.touched && gender.invalid"
          >
            <option value="">Select Gender</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="unissex">Unissex</option>
          </select>
          <div *ngIf="gender.touched && gender.invalid" class="error-message">
            Gender is required.
          </div>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            [(ngModel)]="product.imageUrl"
            name="imageUrl"
            required
            #imageUrl="ngModel"
            [class.invalid]="imageUrl.touched && imageUrl.invalid"
          />
          <div *ngIf="imageUrl.touched && imageUrl.invalid" class="error-message">
            Image URL is required.
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn" [disabled]="form.invalid">Save Changes</button>
          <button type="button" class="cancel-btn" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .edit-product-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #2c5282;
        margin-bottom: 1.5rem;
      }
      .product-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      label {
        font-weight: 500;
      }
      input,
      select,
      textarea {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }
      textarea {
        resize: vertical;
      }
      .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }
      .submit-btn {
        background: #2c5282;
        color: white;
      }
      .submit-btn:hover {
        background: #2a4365;
      }
      .cancel-btn {
        background: #e2e8f0;
        color: #4a5568;
      }
      .cancel-btn:hover {
        background: #cbd5e0;
      }

      /* Red invalid fields */
      .invalid {
        border-color: red;
      }

      /* Error message */
      .error-message {
        color: red;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class EditProductComponent implements OnInit {
  product: Product | null = null;
  tamanhosDisponiveis: number[] = [38, 39, 40, 41, 42];
  isSubmitted = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const product = this.productService.getProductById(id);
    console.log(product);
    if (product) {
      this.product = { ...product };
    } else {
      this.router.navigate(['/products']);
    }
  }

  toggleSize(size: number) {
    if (!this.product) return; 

    if (this.product.size.includes(size)) {
      this.product.size = this.product.size.filter(s => s !== size);
    } else {
      this.product.size.push(size);
    }
  }

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
  // Só envia se o formulário for válido, o produto existir e houver pelo menos um tamanho selecionado
  if (form.valid && this.product && this.product.size.length > 0) {
    this.productService.updateProduct(this.product);
    this.router.navigate(['/products']);
  }
}

  

  cancel() {
    this.router.navigate(['/products']);
  }
}

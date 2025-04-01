import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-create-product",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-product-container">
      <h2>Criando novo produto</h2>
      <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="product-form">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="product.name"
            name="name"
            required
            #name="ngModel"
            [ngClass]="{'error': name.invalid && (name.touched || isSubmitted)}"
          />
          <div *ngIf="name.invalid && (name.touched || isSubmitted)" class="error-message">
            Nome é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label for="price">Preço</label>
          <input
            type="number"
            id="price"
            [(ngModel)]="product.price"
            name="price"
            required
            #price="ngModel"
            [ngClass]="{'error': price.invalid && (price.touched || isSubmitted)}"
          />
          <div *ngIf="price.invalid && (price.touched || isSubmitted)" class="error-message">
            Preço é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label for="brand">Marca</label>
          <select
            id="brand"
            [(ngModel)]="product.brand"
            name="brand"
            required
            #brand="ngModel"
            [ngClass]="{'error': brand.invalid && (brand.touched || isSubmitted)}"
          >
            <option value="">Selecione uma marca</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
          </select>
          <div *ngIf="brand.invalid && (brand.touched || isSubmitted)" class="error-message">
            Marca é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            [(ngModel)]="product.description"
            name="description"
            rows="4"
            #description="ngModel"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="gender">Sexo</label>
          <select
            id="gender"
            [(ngModel)]="product.gender"
            name="gender"
            required
            #gender="ngModel"
            [ngClass]="{'error': gender.invalid && (gender.touched || isSubmitted)}"
          >
            <option value="">Selecione um sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="unissex">Unissex</option>
          </select>
          <div *ngIf="gender.invalid && (gender.touched || isSubmitted)" class="error-message">
            Sexo é obrigatório
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
            [ngClass]="{'error': imageUrl.invalid && (imageUrl.touched || isSubmitted)}"
          />
          <div *ngIf="imageUrl.invalid && (imageUrl.touched || isSubmitted)" class="error-message">
            Link da imagem é obrigatório
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn" [disabled]="productForm.invalid">
            Criar produto
          </button>
          <button type="button" class="cancel-btn" (click)="cancel()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .create-product-container {
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
      .error-message {
        color: red;
        font-size: 0.875rem;
      }
      .error {
        border-color: red;
      }
    `,
  ],
})
export class CreateProductComponent {
  @ViewChild("productForm") productForm!: NgForm;
  product: Product = {
    id: "",
    name: "",
    price: 0,
    brand: "",
    imageUrl: "",
    description: "",
    gender: "unissex",
  };
  isSubmitted = false; // Flag to trigger error messages even when not interacted with fields.

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.isSubmitted = true; // Set to true when the form is submitted
    this.productForm.form.markAllAsTouched(); // Mark all fields as touched to trigger error messages.

    if (this.productForm.valid) {
      this.product.id = Date.now().toString();
      this.productService.addProduct({ ...this.product });
      this.router.navigate(["/products"]);
    }
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}

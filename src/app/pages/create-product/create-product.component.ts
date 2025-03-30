import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-create-product",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-product-container">
      <h2>Create New Product</h2>
      <form (ngSubmit)="onSubmit()" class="product-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="product.name"
            name="name"
            required
          />
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            id="price"
            [(ngModel)]="product.price"
            name="price"
            required
          />
        </div>

        <div class="form-group">
          <label for="brand">Brand</label>
          <select id="brand" [(ngModel)]="product.brand" name="brand" required>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            [(ngModel)]="product.description"
            name="description"
            required
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
          >
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="unissex">Unissex</option>
          </select>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            [(ngModel)]="product.imageUrl"
            name="imageUrl"
            required
          />
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn">Create Product</button>
          <button type="button" class="cancel-btn" (click)="cancel()">
            Cancel
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
    `,
  ],
})
export class CreateProductComponent {
  product: Product = {
    id: "",
    name: "",
    price: 0,
    brand: "",
    imageUrl: "",
    description: "",
    gender: "unissex",
  };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.product.id = Date.now().toString();
    this.productService.addProduct({ ...this.product });
    this.router.navigate(["/products"]);
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}

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
      <h2>Editando produto</h2>
      <form (ngSubmit)="onSubmit(form)" #form="ngForm" class="product-form" *ngIf="product">
        <div class="form-group">
          <label for="name">Nome</label>
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
            [class.invalid]="price.touched && price.invalid"
          />
          <div *ngIf="price.touched && price.invalid" class="error-message">
            Preço é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label for="brand">Marca</label>
          <select id="brand" [(ngModel)]="product.brand" name="brand" required #brand="ngModel" [class.invalid]="brand.touched && brand.invalid">
            <option value="">Selecione uma marca</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Adidas">Adidas</option>
          </select>
          <div *ngIf="brand.touched && brand.invalid" class="error-message">
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
            [class.invalid]="gender.touched && gender.invalid"
          >
            <option value="">Selecione um sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="unissex">Unissex</option>
          </select>
          <div *ngIf="gender.touched && gender.invalid" class="error-message">
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
            [class.invalid]="imageUrl.touched && imageUrl.invalid"
          />
          <div *ngIf="imageUrl.touched && imageUrl.invalid" class="error-message">
            Url da imagem é obrigatório
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn" [disabled]="form.invalid">Salvar alterações</button>
          <button type="button" class="cancel-btn" (click)="cancel()">Cancelar</button>
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.product) {
        this.productService.updateProduct(this.product);
        this.router.navigate(['/products']);
      }
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}

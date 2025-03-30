import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { AuthService } from "../../services/auth.service";
import { Product } from "../../models/product.model";
import { DeleteModalComponent } from "../../components/delete-modal/delete-modal.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteModalComponent, RouterModule ],
  template: `
    <div class="products-page">
      <div class="header">
        <div class="filters">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="filterProducts()"
            placeholder="Search products..."
            class="search-input"
          />

          <select [(ngModel)]="selectedBrand" (change)="filterProducts()" class="brand-select">
          <option value="">All Sizes</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
        </select>

        <select [(ngModel)]="selectedPrice" (change)="filterProducts()" class="brand-select">
          <option value="">All Prices</option>
          <option value="0-150">0-150</option>
          <option value="150-300">150-300</option>
          <option value="300-450">300-450</option>
          <option value="450-600">450-600</option>

        </select>

        <select [(ngModel)]="selectedGender" (change)="filterProducts()" class="brand-select">
          <option value="">All Genders</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="unissex">Unissex</option>

        </select>

          <select
            [(ngModel)]="selectedBrand"
            (change)="filterProducts()"
            class="brand-select"
          >
            <option value="">All Brands</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
          </select>
        </div>

        <button *ngIf="isAdmin" class="add-btn" (click)="navigateToCreate()">
          Add New
        </button>
      </div>

      <div class="products-grid">
        <div *ngFor="let product of filteredProducts" class="product-card">
          <div class="admin-controls" *ngIf="isAdmin">
            <button class="edit-btn" (click)="editProduct(product.id)">
              ✏️
            </button>
            <button class="delete-btn" (click)="openDeleteModal(product.id)">
              🗑️
            </button>
          </div>
           <a [routerLink]="['/product', product.id]">
            <img [src]="product.imageUrl" [alt]="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.brand }}</p>
            <p class="price">{{ product.price | number:'1.2-2' }}</p>
          </a>
        </div>
      </div>
    

    <app-delete-modal
      [isOpen]="showDeleteModal"
      (onConfirm)="confirmDelete()"
      (onCancel)="cancelDelete()"
    ></app-delete-modal>
    </div>
  `,
  styles: [
    `

      input::placeholder {
        color: black;
      }

      .products-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea, #764ba2);
        max-width: 100%;
        margin: 0 auto;
        padding: 2rem;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        
      }
      .filters {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      .search-input, .brand-select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 40px;
        border-color: #2c5282; /* Cor da borda */
        color: #000000;
        background-color: rgb(192, 192, 192); /* Cor de fundo dentro da borda */
      }
      .add-btn {
        padding: 0.75rem 1.5rem;
        background: #2c5282;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .add-btn:hover {
        background: #2a4365;
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
        position: relative;
        border-color: rgb(192, 192, 192);
        background: rgb(192, 192, 192);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .product-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      .product-card h3 {
        margin: 0.5rem 0;
        color: #2d3748;
      }
      .price {
        font-weight: bold;
        color: #2c5282;
        font-size: 1.1rem;
        margin-top: 0.5rem;
      }
      .admin-controls {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        display: flex;
        gap: 0.5rem;
      }
      .edit-btn,
      .delete-btn {
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .edit-btn:hover,
      .delete-btn:hover {
        background: #f5f5f5;
      }
    `,
  ],
})
export class ProductsComponent {
  searchQuery = "";
  selectedBrand = "";
  selectedGender = "";
  selectedPrice = "";
  filteredProducts: Product[] = [];
  isAdmin = false;
  showDeleteModal = false;
  productToDelete: string | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filterProducts();
    this.authService.currentUser$.subscribe((user) => {
      this.isAdmin = user?.isAdmin || false;
    });
  }

  filterProducts() {
    let products = this.productService.getProducts();

    if (this.searchQuery) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.gender.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }



    if (this.selectedBrand) {
      products = products.filter(
        (product) => product.brand === this.selectedBrand
      );
    }

    if (this.selectedGender) {
      products = products.filter(
        (product) => product.gender === this.selectedGender
      );
    }

    if (this.selectedPrice) {
      const [minPrice, maxPrice] = this.selectedPrice.split('-').map(Number); // Dividindo o intervalo de preço
  
      products = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      );
    }


    this.filteredProducts = products;
  }

  navigateToCreate() {
    this.router.navigate(["/create-product"]);
  }

  editProduct(id: string) {
    this.router.navigate(["/edit-product", id]);
  }

  openDeleteModal(id: string) {
    this.productToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete);
      this.filterProducts();
    }
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['brand']) {
        this.selectedBrand = params['brand'];
        this.filterProducts();
      }
    });
}
}
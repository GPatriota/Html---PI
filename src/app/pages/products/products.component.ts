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
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
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
      const [minPrice, maxPrice] = this.selectedPrice.split('-').map(Number); 
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

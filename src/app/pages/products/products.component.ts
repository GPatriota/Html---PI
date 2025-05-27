import { Component, OnInit } from "@angular/core"; // Adicionado OnInit
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { AuthService } from "../../services/auth.service";
import { Product } from "../../models/product.model";
import { DeleteModalComponent } from "../../components/delete-modal/delete-modal.component";
import { ActivatedRoute } from '@angular/router';
import { BrandService } from "../../services/brand.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteModalComponent, RouterModule ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit { // Implementar OnInit
  searchQuery = "";
  selectedBrand = "";
  selectedGender = "";
  selectedPrice = "";
  selectedSize: number | null = null;
  filteredProducts: Product[] = [];
  isAdmin = false;
  showDeleteModal = false;
  productToDelete: string | null = null;
  allProducts: Product[] = []; // Renomeado de 'products' para 'allProducts' para clareza
  availableBrands: string[] = [];
  availableSizes: number[] = []; // Nova propriedade para os tamanhos

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {
    // A chamada inicial de filterProducts será movida para ngOnInit
    this.authService.currentUser$.subscribe((user) => {
      this.isAdmin = user?.isAdmin || false;
    });
  }

  ngOnInit() { // ngOnInit é um bom lugar para buscar dados iniciais
    this.productService.getProducts().subscribe(productsFromService => {
      this.allProducts = productsFromService; // Armazena todos os produtos
      this.extractAvailableSizes(); // Extrai os tamanhos
      this.filterProducts(); // Aplica filtros iniciais (se houver)
    });

    this.brandService.availableBrands$.subscribe(brands => {
      this.availableBrands = brands;
    });

    this.route.queryParams.subscribe(params => {
      if (params['brand']) {
        this.selectedBrand = params['brand'];
      }
    });
  }

  extractAvailableSizes() {
    const allSizesWithDuplicates: number[] = [];
    
    this.allProducts.forEach(product => {
      if (Array.isArray(product.size)) {
        allSizesWithDuplicates.push(...product.size);
      } else if (typeof product.size === 'number') { 
        allSizesWithDuplicates.push(product.size);
      }
    });

    this.availableSizes = [...new Set(allSizesWithDuplicates)].sort((a, b) => a - b);
  }

  filterProducts() {
    let productsToFilter = [...this.allProducts]; 

    if (this.searchQuery) {
      productsToFilter = productsToFilter.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.gender.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedBrand) {
      productsToFilter = productsToFilter.filter(
        (product) => product.brand === this.selectedBrand
      );
    }

    if (this.selectedGender) {
      productsToFilter = productsToFilter.filter(
        (product) => product.gender === this.selectedGender
      );
    }

    if (this.selectedPrice) {
      const [minPrice, maxPrice] = this.selectedPrice.split('-').map(Number);
      productsToFilter = productsToFilter.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (this.selectedSize !== null) {
      const sizeFiltro = this.selectedSize;
      productsToFilter = productsToFilter.filter(product => {

        const sizes = Array.isArray(product.size) ? product.size : (typeof product.size === 'number' ? [product.size] : []);
        return sizes.includes(sizeFiltro);
      });
    }

    this.filteredProducts = productsToFilter;
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
      this.productService.deleteProduct(this.productToDelete).subscribe(() => {

        this.productService.getProducts().subscribe(productsFromService => {
          this.allProducts = productsFromService;
          this.extractAvailableSizes(); 
          this.filterProducts();
        });
      });
    }
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }
}
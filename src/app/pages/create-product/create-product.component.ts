import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { BrandService } from "../../services/brand.service";

@Component({
  selector: "app-create-product",
  standalone: true,
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
  imports: [CommonModule, FormsModule],
})
export class CreateProductComponent {
  @ViewChild("productForm") productForm!: NgForm;

  disponibleSizes: number[] = [38, 39, 40, 41, 42];
  product: Product = {
    id: "",
    size: [],
    name: "",
    price: 0,
    brand: "",
    imageUrl: "",
    description: "",
    gender: "unissex",
  };

  showNewBrandInput = false;
  newBrand = "";
  availableBrands: string[] = [];
  brandErrorMessage = "";
  isSubmitted = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.brandService.availableBrands$.subscribe((brands) => {
      this.availableBrands = brands;
    });
  }

  onBrandChange(value: string): void {
    if (value === "Nova") {
      this.showNewBrandInput = true;
      this.product.brand = "";
      this.brandErrorMessage = "";
    } else {
      this.showNewBrandInput = false;
      this.newBrand = "";
      this.brandErrorMessage = "";
    }
  }

  validateNewBrand(): void {
    if (this.newBrand.trim() && this.brandService.brandExists(this.newBrand.trim())) {
      this.brandErrorMessage = "Essa marca já existe, selecione-a na lista de Marcas.";
    } else {
      this.brandErrorMessage = "";
    }
  }

  toggleSize(size: number) {
  if (this.product.size.includes(size)) {
    this.product.size = this.product.size.filter(s => s !== size);
  } else {
    this.product.size.push(size);
  }
}

  onSubmit() {
    this.isSubmitted = true;
    this.productForm.form.markAllAsTouched();

    if (this.showNewBrandInput && this.newBrand.trim()) {
      const result = this.brandService.addBrand(this.newBrand.trim());
      if (!result.success) {
        this.brandErrorMessage = result.message || "";
        return;
      }
      this.product.brand = this.newBrand.trim();
    }


    if (this.productForm.valid) {
      this.product.id = Date.now().toString();
      this.productService.addProduct({ ...this.product }).subscribe({
        next: () => this.router.navigate(["/products"]),
        error: (err) => {
          alert("Erro ao criar produto: " + err);
          this.router.navigate(["/products"]);
        },
      });
    }
  }

    cancel() {
    this.router.navigate(["/products"]);
  }
}

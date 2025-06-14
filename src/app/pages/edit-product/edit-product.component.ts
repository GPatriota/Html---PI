import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { BrandService } from "../../services/brand.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditProductComponent implements OnInit {
  product: Product | null = null;
  disponibleSizes: number[] = [38, 39, 40, 41, 42];
  showNewBrandInput = false;
  newBrand = "";
  availableBrands: string[] = [];
  brandErrorMessage = "";
  isSubmitted: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {}

  toggleSize(size: number) {
    if (!this.product) return;

    if (this.product.size.includes(size)) {
      this.product.size = this.product.size.filter((s) => s !== size);
    } else {
      this.product.size.push(size);
    }
  }

  ngOnInit() {
    this.brandService.availableBrands$.subscribe((brands) => {
      this.availableBrands = brands;
    });

    const id = this.route.snapshot.params["id"];
    this.productService.getProductById(id).subscribe((product) => {
      if (product) {
        this.product = { ...product };
      } else {
        this.router.navigate(["/products"]);
      }
    });
  }

  onBrandChange(value: string): void {
    if (value === "Nova") {
      this.showNewBrandInput = true;
      if (this.product) {
        this.product.brand = "";
      }
      this.brandErrorMessage = "";
    } else {
      this.showNewBrandInput = false;
      this.newBrand = "";
      this.brandErrorMessage = "";
    }
  }

  validateNewBrand(): void {
    if (
      this.newBrand.trim() &&
      this.brandService.brandExists(this.newBrand.trim())
    ) {
      this.brandErrorMessage =
        "Essa marca já existe, selecione-a na lista de Marcas.";
    } else {
      this.brandErrorMessage = "";
    }
  }

  onSubmit(form: NgForm) {
    if (this.showNewBrandInput && this.newBrand.trim() && this.product) {
      const result = this.brandService.addBrand(this.newBrand.trim());
      if (!result.success) {
        this.brandErrorMessage = result.message || "";
        return;
      }
      this.product.brand = this.newBrand.trim();
    }

    if (form.valid && this.product) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(["/products"]);
      });
    }
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}

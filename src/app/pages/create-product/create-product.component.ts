import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-create-product",
  standalone: true,
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
  imports: [CommonModule, FormsModule]
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

  isSubmitted = false;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.isSubmitted = true;
    this.productForm.form.markAllAsTouched();

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

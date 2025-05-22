import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";

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
  isSubmitted = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.productService.getProductById(id).subscribe((product) => {
      if (product) {
        this.product = { ...product };
      } else {
        this.router.navigate(["/products"]);
      }
    });
  }

  toggleSize(size: number) {
    if (!this.product) return;

    if (this.product.size.includes(size)) {
      this.product.size = this.product.size.filter((s) => s !== size);
    } else {
      this.product.size.push(size);
    }
  }

  onSubmit(form: NgForm) {
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

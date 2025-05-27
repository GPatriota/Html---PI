import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; // FormsModule já está aqui
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule é necessário para ngModel
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: '',
    size: [], // Inicialize como array vazio para evitar erros antes do carregamento
    name: '',
    price: 0,
    brand: "",
    imageUrl: "",
    gender: "unissex",
    description: "",
  };
  quantity = 1;
  selectedSize: number | string | undefined; // Nova propriedade para o tamanho selecionado

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const productId = params.get("id");

      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          if (product) {
            this.product = product;
            // Opcional: definir um tamanho padrão se houver tamanhos disponíveis
            if (product.size && product.size.length > 0) {
              this.selectedSize = product.size[0]; // Seleciona o primeiro tamanho como padrão
            }
            return;
          }
        });
      } else {
        this.router.navigate([""]);
      }
    });
  }

  goToInDeveloping() {
    if (this.authService.isLogged()) {
      // Você pode querer passar o selectedSize para a próxima etapa/serviço aqui
      console.log('Tamanho selecionado:', this.selectedSize);
      this.router.navigate(["/in-developing"]);
    } else {
      alert("Você precisa estar logado para acessar essa página.");
      this.router.navigate(["/login"]);
    }
  }
}
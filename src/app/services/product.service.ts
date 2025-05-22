import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly API = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<Product | undefined>(`${this.API}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.API}/${updatedProduct.id}`,
      updatedProduct
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.API}/${id}`);
  }
}

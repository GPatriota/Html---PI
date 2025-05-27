import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  private defaultBrands: string[] = ["Nike", "Puma", "Adidas"];

  private availableBrandsSubject = new BehaviorSubject<string[]>(
    this.defaultBrands
  );

  public availableBrands$: Observable<string[]> =
    this.availableBrandsSubject.asObservable();

  constructor() {
    this.loadBrands();
  }

  getBrands(): string[] {
    return this.availableBrandsSubject.value;
  }

  public brandExists(brandName: string): boolean {
    if (!brandName || brandName.trim() === "") return false;

    const normalizedBrandName = brandName.trim().toLowerCase();
    const currentBrands = this.availableBrandsSubject.value;

    return currentBrands.some(
      (brand) => brand.toLowerCase() === normalizedBrandName
    );
  }

  addBrand(brandName: string): { success: boolean; message?: string } {
    const normalizedBrandName = brandName.trim();

    if (this.brandExists(normalizedBrandName)) {
      return {
        success: false,
        message: "Essa marca já existe, selecione-a na lista de Marcas.",
      };
    }

    const currentBrands = this.availableBrandsSubject.value;
    const updatedBrands = [...currentBrands, normalizedBrandName];
    this.availableBrandsSubject.next(updatedBrands);
    this.saveBrands(updatedBrands);

    return { success: true };
  }

  private saveBrands(brands: string[]): void {
    localStorage.setItem("availableBrands", JSON.stringify(brands));
  }

  private loadBrands(): void {
    const savedBrands = localStorage.getItem("availableBrands");
    if (savedBrands) {
      try {
        const brands = JSON.parse(savedBrands);
        if (Array.isArray(brands) && brands.length > 0) {
          this.availableBrandsSubject.next(brands);
        }
      } catch (e) {
        console.error("Erro ao carregar marcas do localStorage:", e);
        this.availableBrandsSubject.next(this.defaultBrands);
      }
    }
  }
}

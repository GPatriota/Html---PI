export interface Product {
  id: string;
  size: number[];
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  description: string; 
  gender: 'masculino' | 'feminino' | 'unissex'; 
}
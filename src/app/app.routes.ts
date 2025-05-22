import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { AboutComponent } from "./pages/about/about.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { CreateProductComponent } from "./pages/create-product/create-product.component";
import { EditProductComponent } from "./pages/edit-product/edit-product.component";
import { ProductComponent } from "./pages/product/product.component";
import { InDevelopingComponent } from "./pages/in-developing/in-developing.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "in-developing", component: InDevelopingComponent },
  { path: "register", component: RegisterComponent },
  { path: "create-product", component: CreateProductComponent },
  { path: "product/:id", component: ProductComponent },
  { path: "edit-product/:id", component: EditProductComponent },
  { path: "**", redirectTo: "" },
];

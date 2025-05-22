import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class FooterComponent {
  bottomText: string = "Seu texto de rodapé aqui";
  isAuthenticated: boolean = false;

  constructor() {
    this.isAuthenticated = !!localStorage.getItem("authToken");
  }

  logout() {
    localStorage.removeItem("authToken");
    this.isAuthenticated = false;
  }
}

import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";
import { HeaderComponent } from "./app/components/header/header.component";
import { FooterComponent } from "./app/components/footer/footer.component";
import { appConfig } from "./app/app.config";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class App {}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

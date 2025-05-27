import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  private slideInterval: any;
  private totalSlides = 4;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 7000);
  }

  changeSlide(n: number) {
    this.currentSlide =
      (this.currentSlide + n + this.totalSlides) % this.totalSlides;
  }

  goToProducts(brand: string) {
    this.router.navigate(["/products"], { queryParams: { brand } });
  }
}

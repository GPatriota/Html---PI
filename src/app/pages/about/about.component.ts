import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule], // Import obrigatório para *ngIf funcionar
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  sections = {
    sobre: true,
    historia: true,
    missao: true,
    visao: true,
    valores: true,
  };

  toggleSection(section: keyof typeof this.sections) {
    this.sections[section] = !this.sections[section];
  }
}


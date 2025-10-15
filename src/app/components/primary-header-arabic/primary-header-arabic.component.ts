import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-header-arabic',
  templateUrl: './primary-header-arabic.component.html',
  styleUrl: './primary-header-arabic.component.scss',
})
export class PrimaryHeaderArabicComponent {
  title = input.required<string>();
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-container-arabic',
  templateUrl: './image-container-arabic.component.html',
  styleUrl: './image-container-arabic.component.scss'
})
export class ImageContainerArabicComponent {
  @Input({required: true}) imagePath!: string; // Input property for image path
  @Input({required: true}) title!: string; // Input property for title
  @Input({required: true}) desc!: string; // Input property for description

  @Input({required: true}) number!: string; // Input property for description
}

import { Component, input, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent {
  
  @Input({required: true}) imagePath!: string; // Input property for image path
  @Input({required: true}) title!: string; // Input property for title
  @Input({required: true}) desc!: string; // Input property for description

  @Input({required: true}) number!: string; // Input property for description




}

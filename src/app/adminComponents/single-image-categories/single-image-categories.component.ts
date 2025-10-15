import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-single-image-categories',
  templateUrl: './single-image-categories.component.html',
  styleUrl: './single-image-categories.component.scss'
})
export class SingleImageCategoriesComponent {
  @Output() isVisible = new EventEmitter<boolean>(false);

  imageURL = input.required<string>();
  close(){
    this.isVisible.emit();
  }
}

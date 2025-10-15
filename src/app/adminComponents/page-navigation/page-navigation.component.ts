import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss'
})
export class PageNavigationComponent {
  totalPageNumber = input.required<number>();
  itemsArray: number[] = [];

  constructor() {
    // Create an array with numbers from 1 to fixedNumber
    this.itemsArray = Array.from({ length: this.totalPageNumber() }, (_, i) => i + 1);
  }
}

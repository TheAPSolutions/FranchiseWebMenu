import { Component, input } from '@angular/core';

@Component({
  selector: 'app-total-branches-card',
  templateUrl: './total-branches-card.component.html',
  styleUrl: './total-branches-card.component.scss',
})
export class TotalBranchesCardComponent {
  input_card_title = input.required<string>();
  input_card_data = input.required<number>();
  input_card_section1_title = input.required<string>();
  input_card_section1_data = input.required<number>();
  input_card_section2_title = input.required<string>();
  input_card_section2_data = input.required<number>();
  input_card_section3_title = input.required<string>();
  input_card_section3_data = input.required<number>();
  input_card_unit = input<string>();
  currentMonthName = '';

  ngOnInit(): void {
    this.setCurrentMonthName();
  }
  private setCurrentMonthName(): void {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const currentMonthIndex = new Date().getMonth(); // Get current month index (0-based)
    this.currentMonthName = monthNames[currentMonthIndex]; // Store month name
  }
}

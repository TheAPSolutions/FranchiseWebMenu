import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-filter-date-cashier',
  templateUrl: './filter-date-cashier.component.html',
  styleUrl: './filter-date-cashier.component.scss',
})
export class FilterDateCashierComponent {
  isOpen = signal<boolean>(false);

  OnToggle() {
    this.isOpen.set(!this.isOpen());
  }

  @Output() SQuery = new EventEmitter<Date>(); // EventEmitter to send date to parent

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedDate = target.value ? new Date(target.value) : null; // Convert input to Date or null
    this.SQuery.emit(selectedDate!); // Emit the date to the parent component
    this.OnToggle();
  }
}

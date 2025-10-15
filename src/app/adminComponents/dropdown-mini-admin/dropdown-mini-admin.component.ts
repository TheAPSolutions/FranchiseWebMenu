import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown-mini-admin',
  templateUrl: './dropdown-mini-admin.component.html',
  styleUrl: './dropdown-mini-admin.component.scss',
})
export class DropdownMiniAdminComponent {
  opened = false;
  input_dropdown_title = input.required<string>();
  input_dropdown_options = input.required<string[]>();
  selectedOption = signal<string>(''); // Signal to hold the selected option
  dropdown_title = signal<string | null>(null); //Signal to manage changing the title of the dropdown according to the selected option

  select = output<string>();

  onClick() {
    this.opened = !this.opened;
  }
  onChange(item: string) {
    this.selectedOption.set(item); // Set the selected option using the signal
    this.dropdown_title.set(item); //Setting the dropdown title to the selected option
    this.onClick();
    this.select.emit(item);
  }

}

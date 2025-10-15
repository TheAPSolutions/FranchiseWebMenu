import { Component, EventEmitter, Input, input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown-admin-categories',
  templateUrl: './dropdown-admin-categories.component.html',
  styleUrl: './dropdown-admin-categories.component.scss'
})
export class DropdownAdminCategoriesComponent {
  opened = false;
  input_dropdown_title = input.required<string>();
  input_dropdown_options = input.required<{ name: string, id: number, type: string}[]>();
  selectedOption = signal<string | null>(null); // Signal to hold the selected option
  dropdown_title= signal<string| null>(null);  //Signal to manage changing the title of the dropdown according to the selected option
  @Input() resetSelection: boolean = false;

  @Output() selectedHeader = new EventEmitter<string>();
  selectedItem = output<{ name: string, id: number, type: string}>();

  onClick(){
    this.opened =!this.opened;
  }
  onChange(item: string, id: number, type: string) {
    this.selectedOption.set(item); // Set the selected option using the signal
    this.dropdown_title.set(type === 'subcategory' ? `[Sub] ${item}` : item); // ✅ Show "[Sub]" for subcategories
    this.selectedHeader.emit(item);
    this.selectedItem.emit({ name: item, id: id, type: type }); // ✅ Emit type along with ID
    this.onClick();
  }

  ngOnChanges() {
    // Reset selected option if resetSelection changes to true
    if (this.resetSelection) {
      this.selectedOption.set(null);
      this.dropdown_title.set('Select Category'); // Reset to default title
    }
  }
}

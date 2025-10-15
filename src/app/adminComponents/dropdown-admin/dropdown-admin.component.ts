import { Component, input, output, signal, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-admin',
  templateUrl: './dropdown-admin.component.html',
  styleUrl: './dropdown-admin.component.scss'
})
export class DropdownAdminComponent {
  opened = false;
  input_dropdown_title = input.required<string>();
  input_dropdown_options = input.required<{ name: string, id: number}[]>();
  selectedOption = signal<string | null>(null); // Signal to hold the selected option
  dropdown_title= signal<string| null>(null);  //Signal to manage changing the title of the dropdown according to the selected option
  @Input() resetSelection: boolean = false;

  @Output() selectedHeader = new EventEmitter<string>();
  selectedId = output<number>();

  onClick(){
    this.opened =!this.opened;
  }
  onChange(item: string, id: number){
    this.selectedOption.set(item); // Set the selected option using the signal
    this.dropdown_title.set(item); //Setting the dropdown title to the selected option
    this.selectedHeader.emit(item);
    this.selectedId.emit(id);
    this.onClick();
  }

  ngOnChanges() {
    // Reset selected option if resetSelection changes to true
    if (this.resetSelection) {
      this.selectedOption.set(null);
      this.dropdown_title.set('Select Category'); // Reset to default title
      this.resetSelection  = false;
    }
  }
}

import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
})
export class CheckBoxComponent implements OnInit {
  input_checkbox_title = input.required<string>();
  checkboxId: string = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  checkboxChange = output<boolean>();

  langaugeService = inject(LanguageService);
  langauge = this.langaugeService.getLanguage();
  @Input() checked: boolean = false; // ✅ Allow pre-checked state
  @Input() disabled: boolean = false;
   ngOnInit(): void {
       this.langaugeService.currentLanguage$.subscribe((language) =>{
        this.langauge = language;
       });
   }

  // Emit the checked status when the checkbox changes
  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checkboxChange.emit(isChecked);
  }

  // Reset the checkbox programmatically
  resetCheckbox() {
    const checkbox = document.getElementById(
      this.checkboxId
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
    this.checkboxChange.emit(false); // Emit false to notify the parent that it's reset
  }
}

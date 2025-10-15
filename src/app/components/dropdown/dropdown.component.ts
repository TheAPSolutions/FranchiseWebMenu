import {Component, EventEmitter, inject, input, Output, output, signal, WritableSignal} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { BranchService } from '../../Services/branch.service';
import { getBranches } from '../../models/Branch/get-branch.model';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent {
  @Output() change = new EventEmitter<number>();
  private languageService = inject(LanguageService);
  DropDownTitle: WritableSignal<string> = signal('')
  option = signal<string>('');
  language = 'Tr';

  branchService = inject(BranchService);
  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.locations = response || []; // Ensure safe access
      },
      error: (err) => {
        //console.error('Error fetching branches:', err); // Log any error
      },
    });

    // Initialize titles based on the default language
    this.updateTitles();
  }
  
     private updateTitles() {
    // Update titles based on the current language in the service
    this.DropDownTitle = this.languageService.DropDownTitle;
    this.language = this.languageService.getLanguage();
  }
  opened = false;
  dropdownTitle = this.DropDownTitle;
  locations!: getBranches[];
  onClick(){
    this.opened =!this.opened;
  }
  onChange(item: getBranches){
    this.option.set(item.name);
    this.change.emit(item.id); // Emit the selected language
    this.onClick();
  }
}

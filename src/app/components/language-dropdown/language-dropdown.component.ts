import { Component, inject, OnInit } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'], // Correct property name is 'styleUrls'
})
export class LanguageDropdownComponent implements OnInit {
  private language = inject(LanguageService);
  opened = false;
  dropdownTitle = this.language.getLanguage();
  locations: string[] = ['En', 'Tr', 'Ar'];

  ngOnInit() {
    // Update dropdown title on language change
    this.language.currentLanguage$.subscribe((newLang) => {
      this.dropdownTitle = newLang; // Update title when the language changes
    });
  }

  onClick() {
    this.opened = !this.opened; // Toggle dropdown open state
  }

  onChange(item: string) {
    this.language.setLanguage(item); // Change the language in the service
    this.onClick(); // Close the dropdown
  }
}

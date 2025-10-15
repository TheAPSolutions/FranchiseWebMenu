import { Component, inject, input } from '@angular/core';
import { LanguageService } from '../Services/language.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  
  input_categroy_image = input.required<String>();
  input_categroy_title = input.required<String>();
  private languageService = inject(LanguageService);
  language = 'Ar';

  ngOnInit(): void {
    this.language = this.languageService.getLanguage();
  }

  // This method returns the correct background image URL format
  getBackgroundImage(imageUrl: String): String {
    return `url(${imageUrl})`;
  }
}

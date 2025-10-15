import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-categories-header-admin',
  templateUrl: './categories-header-admin.component.html',
  styleUrl: './categories-header-admin.component.scss',
})
export class CategoriesHeaderAdminComponent {
  private languageService = inject(LanguageService);
  Image: WritableSignal<string> = signal('');
  Name: WritableSignal<string> = signal('');
  Price: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.Image = this.languageService.Image;
    this.Name = this.languageService.Name;
    this.Price = this.languageService.Price;
  }
}

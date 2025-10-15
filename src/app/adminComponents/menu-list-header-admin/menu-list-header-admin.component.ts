import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-menu-list-header-admin',
  templateUrl: './menu-list-header-admin.component.html',
  styleUrl: './menu-list-header-admin.component.scss'
})
export class MenuListHeaderAdminComponent {
  private languageService = inject(LanguageService);
  Image: WritableSignal<string> = signal('');
  Name: WritableSignal<string> = signal('');
  Price: WritableSignal<string> = signal('');
  Description: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.Image = this.languageService.Image;
    this.Name = this.languageService.Name;
    this.Price = this.languageService.Price;
    this.Description = this.languageService.Description;
  }
}

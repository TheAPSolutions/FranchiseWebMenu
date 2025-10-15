import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-offer-list-header-admin',
  templateUrl: './offer-list-header-admin.component.html',
  styleUrl: './offer-list-header-admin.component.scss'
})
export class OfferListHeaderAdminComponent {
  private languageService = inject(LanguageService);
  Image: WritableSignal<string> = signal('');
  Description: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.Image = this.languageService.Image;
    this.Description = this.languageService.Description;
  }
}

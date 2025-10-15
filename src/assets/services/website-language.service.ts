import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../../app/Services/language.service';

@Injectable({
  providedIn: 'root',
})
export class WebsiteLanguageService {
  constructor(private translate: TranslateService) {}

  initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'tr';
    this.translate.setDefaultLang('tr');
    this.translate.use(savedLang);
    this.setBodyClass(savedLang);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.setBodyClass(lang);
  }

  private setBodyClass(lang: string) {
    const website = document.querySelector('.website');
    if (!website) return;

    website.classList.remove('website-en', 'website-ar', 'website-tr');
    website.classList.add(`website-${lang}`);
  }

  getTranslatedValue(item: any, field: string): string | number {
    const lang = this.translate.currentLang || 'tr';
    return item[`${field}${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
  }

  getJsonTranslationAsync(key: string): Observable<string> {
    return this.translate.get(key);
  }

  getCurrentLang(): string {
    return (
      this.translate.currentLang || this.translate.getDefaultLang() || 'tr'
    );
  }
}

import { Component } from '@angular/core';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';

@Component({
  selector: 'app-layout-website',
  templateUrl: './layout-website.component.html',
  styleUrl: './layout-website.component.scss',
})
export class LayoutWebsiteComponent {
  constructor(private langService: WebsiteLanguageService) {}

  ngAfterViewInit(): void {
    const savedLang = localStorage.getItem('lang') || 'tr';
    this.langService.switchLanguage(savedLang); // ✅ Now .website exists in DOM
  }
}

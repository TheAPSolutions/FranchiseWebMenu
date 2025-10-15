import { Component, inject } from '@angular/core';
import { WebsiteLanguageService } from '../assets/services/website-language.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare global {
  interface Window {
    dataLayer: any[];
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);

  constructor(private websiteLangService: WebsiteLanguageService) {
    window.dataLayer = window.dataLayer || [];
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        window.dataLayer.push({
          event: 'page_view',
          page_location: window.location.href,
          page_path: e.urlAfterRedirects,
          page_title: document.title,
        });
      });
  }

  ngOnInit(): void {
    this.websiteLangService.initLanguage();
  }

  ngAfterViewInit(): void {
    const currentLang = localStorage.getItem('lang') || 'tr';
    this.websiteLangService.switchLanguage(currentLang);
  }
}

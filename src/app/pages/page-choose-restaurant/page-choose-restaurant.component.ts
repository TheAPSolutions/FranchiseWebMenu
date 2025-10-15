import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-choose-restaurant',
  templateUrl: './page-choose-restaurant.component.html',
  styleUrl: './page-choose-restaurant.component.scss',
})
export class PageChooseRestaurantComponent implements OnInit {
  private languageService = inject(LanguageService);
  MenuTitle: WritableSignal<string> = signal('');

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    // Initialize titles based on the default language
    this.updateTitles();
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.MenuTitle = this.languageService.MenuPageTitle;
    this.NavLeft = this.languageService.Home;
    this.NavRight = this.languageService.Cart;
  }
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.scss',
})
export class PageDashboardComponent {
  Dashboard: WritableSignal<string> = signal('');

  languageService = inject(LanguageService);

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }
  updateTitles() {
    this.Dashboard = this.languageService.Dashboard;
  }
}

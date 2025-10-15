import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-search-admin',
  templateUrl: './search-admin.component.html',
  styleUrl: './search-admin.component.scss',
})
export class SearchAdminComponent {
  searchQuery = '';
  @Output() SQuery = new EventEmitter<string>();

  private languageService = inject(LanguageService);
  Search: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }
  onEnter() {
    this.SQuery.emit(this.searchQuery);
  }

  updateTitles(){
    this.Search = this.languageService.Search;

  }
}

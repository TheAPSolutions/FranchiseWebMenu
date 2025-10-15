import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-button-cashier-view-details',
  templateUrl: './button-cashier-view-details.component.html',
  styleUrl: './button-cashier-view-details.component.scss'
})
export class ButtonCashierViewDetailsComponent {
  private languageService = inject(LanguageService);
  ViewOrderDetails: WritableSignal<string> = signal('');
   
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
    this.ViewOrderDetails = this.languageService.ViewOrderDetails;
  }
}

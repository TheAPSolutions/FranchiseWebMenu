import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-navigation-cashier',
  templateUrl: './navigation-cashier.component.html',
  styleUrl: './navigation-cashier.component.scss'
})
export class NavigationCashierComponent {
  activeLink: string = '';

  TodaysOrder: WritableSignal<string> = signal('');
  NewOrders: WritableSignal<string> = signal('');
  OrdersHistory: WritableSignal<string> = signal('');
  ReadyOrders: WritableSignal<string> = signal('');

  languageService = inject(LanguageService);
  // Method to set the active link
  setActive(link: string) {
    this.activeLink = link;
    //console.log(this.activeLink);
  }
    
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
    this.TodaysOrder = this.languageService.TodaysOrder;
    this.NewOrders = this.languageService.NewOrders;
    this.OrdersHistory= this.languageService.OrdersHistory;
    this.ReadyOrders= this.languageService.ReadyOrders;
  }
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { OrderResponse } from '../../models/dashboard/OrderResponse.model';
import { DashboardService } from '../../Services/dashboard.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-cashier-payment-manager',
  templateUrl: './cashier-payment-manager.component.html',
  styleUrl: './cashier-payment-manager.component.scss',
})
export class CashierPaymentManagerComponent {
  orders: OrderResponse[] = [];
  totalSales: number = 0;

  selectedBranch: number = 1; // Default branch ID
  startDate: string = '';
  endDate: string = '';
  branchName = 'Beşiktaş';

  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  cashierPaymentManager: WritableSignal<string> = signal('');
  selectYear: WritableSignal<string> = signal('');
  selectMonth: WritableSignal<string> = signal('');
  selectBranchLanguage: WritableSignal<string> = signal('');
  startDateLanguage: WritableSignal<string> = signal('');
  endDateLanguage: WritableSignal<string> = signal('');
  selectedBranchLanguage: WritableSignal<string> = signal('');
  chosenDate: WritableSignal<string> = signal('');
  totalSalesLanguage: WritableSignal<string> = signal('');
  orderID: WritableSignal<string> = signal('');
  totalPrice: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.fetchOrders();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.cashierPaymentManager = this.languageService.cashierPaymentManager;
    this.selectYear = this.languageService.selectYear;
    this.selectMonth = this.languageService.selectMonth;
    this.selectBranchLanguage = this.languageService.selectBranch;
    this.startDateLanguage = this.languageService.startDate;
    this.endDateLanguage = this.languageService.endDate;
    this.selectedBranchLanguage = this.languageService.selectedBranch;
    this.chosenDate = this.languageService.chosenDate;
    this.totalSalesLanguage = this.languageService.totalSales;
    this.orderID = this.languageService.orderID;
    this.totalPrice = this.languageService.totalPrice;
  }

  fetchOrders(): void {
    this.dashboardService
      .getFilteredOrders(this.selectedBranch, this.startDate, this.endDate)
      .subscribe((data) => {
        this.orders = data;
        //console.log('Orders:', this.orders);
        this.totalSales = data.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );
      });
  }

  selectBranch(id: number): void {
    this.selectedBranch = id;
    this.fetchOrders();
    if (id === 1) {
      this.branchName = 'Beşiktaş';
    }
    if (id === 2) {
      this.branchName = 'Maslak 1453';
    }
    if (id === 3) {
      this.branchName = 'Batışehir';
    }
  }

  branches = [
    { id: 1, name: 'Beşiktaş' },
    { id: 2, name: 'Maslak 1453' },
    { id: 3, name: 'Batışehir' },
  ];

  // ✅ Define months array
  months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];
}

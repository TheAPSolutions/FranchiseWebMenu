import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../Services/dashboard.service';
import { TotalNumberOfItemsPerMonth } from '../../models/dashboard/totalNoItemsPerMonth.model';
import { BranchOrdersResponse } from '../../models/dashboard/branchOrdersResponse.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-total-sold-items-number',
  templateUrl: './total-sold-items-number.component.html',
  styleUrl: './total-sold-items-number.component.scss',
})
export class TotalSoldItemsNumberComponent {
  private dashboardService = inject(DashboardService);
  totalNoOfItems: TotalNumberOfItemsPerMonth[] = [];
  currentMonthData: { name: string; value: number }[] = [];
  allOrders: BranchOrdersResponse[] = [];
  currentMonthOrders: BranchOrdersResponse[] = [];
  private languageService = inject(LanguageService);

  numberOfSoldItems: WritableSignal<string> = signal('');

  ngOnInit() {
    this.dashboardService.getTotalNumberOfItemsPerMonth().subscribe((res) => {
      this.totalNoOfItems = res;
      this.extractCurrentMonthData();
      //console.log(this.totalNoOfItems);
    });
    this.fetchBranchOrders();

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  extractCurrentMonthData(): void {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

    const currentMonthData = this.totalNoOfItems.find(
      (stat) => stat.year === currentYear && stat.month === currentMonth
    );

    if (currentMonthData) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      this.currentMonthData = [
        {
          name: monthNames[currentMonth - 1], // Convert month number to name
          value: currentMonthData.totalItemsOrdered
        }
      ];
    } else {
      this.currentMonthData = []; // No data available for the current month
    }

    //console.log('Current Month Data:', this.currentMonthData);
  }

  fetchBranchOrders(): void {
    this.dashboardService.getTotalItemsOrderedPerBranch().subscribe({
      next: (data) => {
        this.allOrders = data;
        this.filterCurrentMonthOrders();
        //console.log('All Orders:', this.allOrders);
        //console.log('Current Month Orders:', this.currentMonthOrders);
      },
      error: (err) => {
        //console.error('Error fetching branch orders:', err);
      },
    });
  }

  // Extract current month, current year data for branches 1, 2, 3
  private filterCurrentMonthOrders(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS

    this.currentMonthOrders = this.allOrders.filter(
      (order) =>
        order.year === currentYear &&
        order.month === currentMonth &&
        [1, 2, 3].includes(order.branchId) // Only branches 1, 2, 3
    );
  }

  updateTitles() {
    this.numberOfSoldItems = this.languageService.numberOfSoldItems;
  }

}

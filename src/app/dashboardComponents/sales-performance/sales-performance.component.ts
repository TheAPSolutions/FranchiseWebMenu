import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TotalSalesResponse } from '../../models/dashboard/TotalSalesResponse.model';
import { DashboardService } from '../../Services/dashboard.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-sales-performance',
  templateUrl: './sales-performance.component.html',
  styleUrl: './sales-performance.component.scss',
})
export class SalesPerformanceComponent {
  salesData: TotalSalesResponse[] = [];
  lastMonthSales: number | null = null;
  prevMonthSales: number | null = null;
  percentageChange: number | null = null;
  isIncrease: boolean | null = null; // True for increase, False for decrease
  lastMonthName: string = '';
  lastMonthYear: number = 0;
  prevMonthName: string = ''; 
  prevMonthYear: number = 0;
  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  salesPerformanceBetweenPreviousTwoMonths: WritableSignal<string> = signal('');
  ngOnInit() {
    this.fetchSalesData();

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  fetchSalesData() {
    this.dashboardService.getTotalSalesPerMonth().subscribe((data) => {
      this.salesData = data;
  
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // JS months are 0-based
  
      // ✅ Remove the current month from data
      const pastSalesData = this.salesData.filter(
        (entry) => !(entry.year === currentYear && entry.month === currentMonth)
      );
  
      if (pastSalesData.length >= 2) {
        // ✅ Get the last two months before the current month
        const [latest, previous] = pastSalesData.slice(0, 2);
  
        this.lastMonthSales = latest.totalSales;
        this.prevMonthSales = previous.totalSales;
  
        // ✅ Store month names
        this.lastMonthName = this.getMonthName(latest.month);
        this.lastMonthYear = latest.year;
  
        this.prevMonthName = this.getMonthName(previous.month);
        this.prevMonthYear = previous.year;
  
        // ✅ Calculate percentage change
        if (this.prevMonthSales !== 0) {
          this.percentageChange =
            ((this.lastMonthSales - this.prevMonthSales) / this.prevMonthSales) *
            100;
          this.isIncrease = this.percentageChange > 0;
        } else {
          this.percentageChange = null; // Avoid division by zero
        }
      } else {
        this.percentageChange = null; // Not enough data
      }
    });
  }
  
  // ✅ Function to convert month number to month name
  getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1]; // Since array is 0-based, adjust by -1
  }
  

  getAbsolutePercentage(value: number | null): string {
    if (value === null) return '0';
    return Math.abs(value).toFixed(2); // Ensures two decimal places
  }

  updateTitles() {
    this.salesPerformanceBetweenPreviousTwoMonths = this.languageService.salesPerformanceBetweenPreviousTwoMonths;
  }
}

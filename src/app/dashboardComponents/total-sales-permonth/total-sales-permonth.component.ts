import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../Services/dashboard.service';
import { TotalNumberOfItemsPerMonth } from '../../models/dashboard/totalNoItemsPerMonth.model';
import { BranchOrdersResponse } from '../../models/dashboard/branchOrdersResponse.model';
import { TotalSalesResponse } from '../../models/dashboard/TotalSalesResponse.model';
import { TotalSalesBranchResponse } from '../../models/dashboard/TotalSalesBranchResponse.model';
import { TotalSalesPaymentResponse } from '../../models/dashboard/TotalSalesPaymentResponse.model';
import { TotalSalesPaymentBranchResponse } from '../../models/dashboard/TotalSalesPaymentBranchResponse.model';
import { LanguageService } from '../../Services/language.service';
@Component({
  selector: 'app-total-sales-permonth',
  templateUrl: './total-sales-permonth.component.html',
  styleUrl: './total-sales-permonth.component.scss',
})
export class TotalSalesPermonthComponent {
  private dashboardService = inject(DashboardService);
  totalSalesData: TotalSalesResponse[] = [];
  currentMonthSales: TotalSalesResponse | null = null;
  currentMonthName: string = ''; // ✅ Holds the month name
  totalSalesBranchData: TotalSalesBranchResponse[] = [];
  currentMonthSalesBranch: TotalSalesBranchResponse[] = [];
  totalSalesPaymentData: TotalSalesPaymentResponse[] = [];
  currentMonthSalesPayment: TotalSalesPaymentResponse | null = null;
  totalSalesPaymentBranchData: TotalSalesPaymentBranchResponse[] = [];
  currentMonthSalesPaymentBranch: TotalSalesPaymentBranchResponse[] = [];

  private languageService = inject(LanguageService);

  totalSalesPerMonth: WritableSignal<string> = signal('');
  paidByCashier: WritableSignal<string> = signal('');
  paidByCard: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.setCurrentMonthName();
    this.fetchTotalSalesData();
    this.fetchTotalSalesBranchData();
    this.fetchTotalSalesPaymentData();
    this.fetchTotalSalesPaymentBranchData();

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  fetchTotalSalesData(): void {
    this.dashboardService.getTotalSalesPerMonth().subscribe({
      next: (data) => {
        this.totalSalesData = data;
        this.filterCurrentMonthData();
        //console.log('Total Sales Data:', this.totalSalesData);
        //console.log(`Current Month (${this.currentMonthName}) Sales:`,this.currentMonthSales);
      },
      error: (err) => {
        //console.error('Error fetching total sales per month:', err);
      },
    });
  }
  fetchTotalSalesBranchData(): void {
    this.dashboardService.getTotalSalesPerBranchPerMonth().subscribe({
      next: (data) => {
        this.totalSalesBranchData = data;
        this.filterCurrentMonthBranchData();
        //console.log('Total Sales Data Per Branch:', this.totalSalesBranchData);
        //console.log(`Current Month (${this.currentMonthName}) Sales Per Branch:`,this.currentMonthSalesBranch);
      },
      error: (err) => {
        //console.error('Error fetching total sales per branch per month:', err);
      },
    });
  }

  fetchTotalSalesPaymentData(): void {
    this.dashboardService.getTotalSalesPerPaymentMethod().subscribe({
      next: (data) => {
        this.totalSalesPaymentData = data;
        this.filterCurrentMonthPaymentData();
        //console.log('Total Sales Data (Cash & Card) Per Month:',this.totalSalesPaymentData);
        //console.log(`Current Month (${this.currentMonthName}) Sales:`,this.currentMonthSalesPayment);
      },
      error: (err) => {
        //console.error('Error fetching total sales per payment method:', err);
      },
    });
  }
  fetchTotalSalesPaymentBranchData(): void {
    this.dashboardService.getTotalSalesPerPaymentMethodPerBranch().subscribe({
      next: (data) => {
        this.totalSalesPaymentBranchData = data;
        this.filterCurrentMonthPaymentBranchData();
        //console.log('Total Sales Data Per Branch (Cash & Card) Per Month:',this.totalSalesPaymentBranchData);
        //console.log(`Current Month (${this.currentMonthName}) Sales Per Branch:`,this.currentMonthSalesPaymentBranch);
      },
      error: (err) => {
        //console.error('Error fetching total sales per payment method per branch:',err);
      },
    });
  }

  private filterCurrentMonthPaymentBranchData(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthSalesPaymentBranch =
      this.totalSalesPaymentBranchData.filter(
        (sales) => sales.year === currentYear && sales.month === currentMonth
      );
  }

  private filterCurrentMonthPaymentData(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthSalesPayment =
      this.totalSalesPaymentData.find(
        (sales) => sales.year === currentYear && sales.month === currentMonth
      ) || null;
  }

  private filterCurrentMonthBranchData(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthSalesBranch = this.totalSalesBranchData.filter(
      (sales) => sales.year === currentYear && sales.month === currentMonth
    );
  }

  private filterCurrentMonthData(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthSales =
      this.totalSalesData.find(
        (sales) => sales.year === currentYear && sales.month === currentMonth
      ) || null;
  }

  private setCurrentMonthName(): void {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const currentMonthIndex = new Date().getMonth(); // Get current month index (0-based)
    this.currentMonthName = monthNames[currentMonthIndex]; // Store month name
  }

  updateTitles() {
    this.totalSalesPerMonth = this.languageService.totalSalesPerMonth;
    this.paidByCashier = this.languageService.paidByCashier;
    this.paidByCard = this.languageService.paidByCard;
  }
}

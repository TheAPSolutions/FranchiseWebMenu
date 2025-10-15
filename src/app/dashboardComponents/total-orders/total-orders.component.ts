import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../Services/dashboard.service';
import { TotalNumberOfItemsPerMonth } from '../../models/dashboard/totalNoItemsPerMonth.model';
import { BranchOrdersResponse } from '../../models/dashboard/branchOrdersResponse.model';
import { TotalOrdersResponse } from '../../models/dashboard/TotalOrdersResponse.model';
import { OrderBranchResponse } from '../../models/dashboard/OrderBranchResponse.model';
import { DineInTakeawayResponse } from '../../models/dashboard/DineInTakeawayResponse.model';
import { DineInTakeawayBranchResponse } from '../../models/dashboard/DineInTakeawayBranchResponse.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrl: './total-orders.component.scss',
})
export class TotalOrdersComponent {
  totalOrdersData: TotalOrdersResponse[] = [];
  currentMonthOrders: TotalOrdersResponse | null = null;
  currentMonthName: string = ''; // ✅ Holds the month name
  totalOrdersDataBranch: OrderBranchResponse[] = [];
  currentMonthOrdersBranch: OrderBranchResponse[] = [];
  dineInTakeawayData: DineInTakeawayResponse[] = [];
  currentMonthDineInTakeaway: DineInTakeawayResponse | null = null;
  dineInTakeawayBranchData: DineInTakeawayBranchResponse[] = [];
  currentMonthDineInTakeawayBranch: DineInTakeawayBranchResponse[] = [];

  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  numberOfOrders: WritableSignal<string> = signal('');
  numberOfDineInOrders: WritableSignal<string> = signal('');
  numberOfTakeAwayOrders: WritableSignal<string> = signal('');

  ngOnInit() {
    this.setCurrentMonthName(); // ✅ Set the month name
    this.fetchOrdersData();
    this.fetchOrdersBranchData();
    this.fetchDineInTakeawayData();
    this.fetchDineInTakeawayBranchData();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  fetchOrdersData(): void {
    this.dashboardService.getTotalOrdersPerMonth().subscribe({
      next: (data) => {
        this.totalOrdersData = data;
        this.filterCurrentMonthOrders();
        //console.log('Total Orders Data:', this.totalOrdersData);
        //console.log( `Current Month (${this.currentMonthName}) Orders:`, this.currentMonthOrders);
      },
      error: (err) => {
        //console.error('Error fetching order statistics:', err);
      },
    });
  }

  fetchOrdersBranchData(): void {
    this.dashboardService.getTotalOrdersPerBranch().subscribe({
      next: (data) => {
        this.totalOrdersDataBranch = data;
        this.filterCurrentMonthOrdersBranch();
        //console.log('Total Orders Data Branch:', this.totalOrdersDataBranch);
        //console.log(`Current Month Branch (${this.currentMonthName}) Orders:`, this.currentMonthOrdersBranch);
      },
      error: (err) => {
        //console.error('Error fetching order statistics:', err);
      },
    });
  }

  fetchDineInTakeawayData(): void {
    this.dashboardService.getDineInTakeawayOrders().subscribe({
      next: (data) => {
        this.dineInTakeawayData = data;
        this.filterCurrentMonthDataDineInTakeaway();
        //console.log('Dine-In & Takeaway Data:', this.dineInTakeawayData);
        //console.log(`Current Month (${this.currentMonthName}) Data:`,this.currentMonthDineInTakeaway );
      },
      error: (err) => {
        //console.error('Error fetching dine-in and takeaway statistics:', err);
      },
    });
  }

  fetchDineInTakeawayBranchData(): void {
    this.dashboardService.getDineInTakeawayOrdersPerBranch().subscribe({
      next: (data) => {
        this.dineInTakeawayBranchData = data;
        this.filterCurrentMonthDataDineInTakeawayBranch();
        //console.log('Dine-In & Takeaway Data Per Branch:',this.dineInTakeawayBranchData);
        //console.log(`Current Month (${this.currentMonthName}) Data:`,this.currentMonthDineInTakeawayBranch);
      },
      error: (err) => {
        //console.error('Error fetching dine-in and takeaway statistics per branch:',err);
      },
    });
  }

  private filterCurrentMonthDataDineInTakeawayBranch(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthDineInTakeawayBranch =
      this.dineInTakeawayBranchData.filter(
        (order) => order.year === currentYear && order.month === currentMonth
      );
  }

  private filterCurrentMonthDataDineInTakeaway(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthDineInTakeaway =
      this.dineInTakeawayData.find(
        (order) => order.year === currentYear && order.month === currentMonth
      ) || null; // ✅ Return null if no data found
  }

  private filterCurrentMonthOrders(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JS months are 0-based

    this.currentMonthOrders =
      this.totalOrdersData.find(
        (order) => order.year === currentYear && order.month === currentMonth
      ) || null;
  }

  private filterCurrentMonthOrdersBranch(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based

    this.currentMonthOrdersBranch = this.totalOrdersDataBranch.filter(
      (order) => order.year === currentYear && order.month === currentMonth
    );
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
    this.numberOfOrders = this.languageService.numberOfOrders;
    this.numberOfDineInOrders = this.languageService.numberOfDineInOrders;
    this.numberOfTakeAwayOrders = this.languageService.numberOfTakeAwayOrders;
  }
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { MenuItemSalesResponse } from '../../models/dashboard/MenuItemSalesResponse.model';
import { DashboardService } from '../../Services/dashboard.service';
import { CategoryService } from '../../Services/category.service';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItemQuantityResponse } from '../../models/dashboard/MenuItemQuantityResponse.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataForChart } from '../../models/dashboard/DataForChart.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-item-performance-per-branch',
  templateUrl: './item-performance-per-branch.component.html',
  styleUrl: './item-performance-per-branch.component.scss',
})
export class ItemPerformancePerBranchComponent {
  categories: any[] = [];
  menuItems: MenuItem[] = [];
  salesData: MenuItemQuantityResponse[] = [];
  selectedCategory!: number;
  selectedMenuItem!: number;
  selectedMonth!: number;
  selectedYear: number = new Date().getFullYear();
  chartData: DataForChart[] = []; // ✅ For ngx-charts

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

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Menu Item';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, // Use ScaleType.Ordinal instead of 'Ordinal'
    domain: ['#005F73', '#A4B494', '#E07A5F', '#E07A5F'],
  };

  private dashboardService = inject(DashboardService);
  private categoryService = inject(CategoryService);
  private menuItemService = inject(MenuItemsServiceService);

  private languageService = inject(LanguageService);

  itemPerformancePerBranch: WritableSignal<string> = signal('');
  selectCategory: WritableSignal<string> = signal('');
  selectMenuItem: WritableSignal<string> = signal('');
  selectYear: WritableSignal<string> = signal('');
  selectMonth: WritableSignal<string> = signal('');
  noSalesDataAvailable: WritableSignal<string> = signal('');
  years: number[] = [];

  ngOnInit(): void {
    this.loadCategories();
    this.generateYearList();

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.itemPerformancePerBranch =
      this.languageService.itemPerformancePerBranch;
    this.selectCategory = this.languageService.selectCategory;
    this.selectMenuItem = this.languageService.selectMenuItem;
    this.selectYear = this.languageService.selectYear;
    this.selectMonth = this.languageService.selectMonth;
    this.noSalesDataAvailable = this.languageService.noSalesDataAvailable;
    
  }

  // Load all categories for dropdown
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Generate years from 2020 to current year
  generateYearList() {
    const currentYear = new Date().getFullYear();
    for (let year = 2020; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  // Load menu items based on category selection
  onCategoryChange() {
    if (!this.selectedCategory) return;
    this.menuItemService
      .getAllItemByCategoryId(this.selectedCategory)
      .subscribe((data) => {
        this.menuItems = data;
      });
  }

  // Fetch sales data when menu item, month, and year are selected
  fetchSalesData() {
    if (!this.selectedMenuItem || !this.selectedMonth || !this.selectedYear)
      return;

    this.dashboardService
      .getTotalQuantitySoldPerMenuItemPerBranch(
        this.selectedMenuItem,
        this.selectedMonth,
        this.selectedYear
      )
      .subscribe((data) => {
        this.salesData = data;
        this.chartData = this.salesData.map((item) => ({
          name: item.branchName, // Branch Name as Label
          value: item.totalQuantitySold, // Total Quantity Sold as Value
        }));
      });
  }
}

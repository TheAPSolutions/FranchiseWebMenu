import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TotalSalesBranchResponse } from '../../models/dashboard/TotalSalesBranchResponse.model';
import { DataForChart } from '../../models/dashboard/DataForChart.model';
import { DashboardService } from '../../Services/dashboard.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-sales-between-branches',
  templateUrl: './sales-between-branches.component.html',
  styleUrl: './sales-between-branches.component.scss',
})
export class SalesBetweenBranchesComponent {
  totalSalesData: TotalSalesBranchResponse[] = []; // ✅ Holds API response
  filteredChartData: DataForChart[] = []; // ✅ Formatted for ngx-charts
  years: number[] = []; // ✅ Available years for selection
  months: { id: number; name: string }[] = []; // ✅ Month options
  selectedYear: number = new Date().getFullYear(); // ✅ Default to current year
  selectedMonth: number = new Date().getMonth() + 1; // ✅ Default to current month
  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  salesBetweenBranches: WritableSignal<string> = signal('');
  selectYear: WritableSignal<string> = signal('');
  selectMonth: WritableSignal<string> = signal('');
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

  ngOnInit(): void {
    this.initializeMonths();
    this.fetchSalesData();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.salesBetweenBranches = this.languageService.salesBetweenBranches;
    this.selectYear = this.languageService.selectYear;
    this.selectMonth = this.languageService.selectMonth;
  }

  // ✅ Fetch Total Sales Per Branch Per Month
  fetchSalesData(): void {
    this.dashboardService.getTotalSalesPerBranchPerMonth().subscribe({
      next: (data) => {
        this.totalSalesData = data;
        this.extractYears(); // Extract available years
        this.updateChartData();
      },
      error: (err) => console.error('❌ Error fetching sales data:', err),
    });
  }

  // ✅ Populate months list
  private initializeMonths(): void {
    this.months = [
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

  // ✅ Extract unique years from response
  private extractYears(): void {
    const uniqueYears = new Set(this.totalSalesData.map((item) => item.year));
    this.years = Array.from(uniqueYears).sort((a, b) => b - a);
  }

  // ✅ Filter data when the user selects a different month/year
  updateChartData(): void {
    //console.log('🔄 Updating chart for:',this.selectedYear,this.selectedMonth);

    // ✅ Ensure we have valid data before filtering
    if (!this.totalSalesData || this.totalSalesData.length === 0) {
      //console.warn('⚠️ No sales data available yet!');
      return;
    }

    //console.log('🔎 Available Data Before Filtering:', this.totalSalesData);

    // ✅ Convert to numbers (in case they are strings)
    const selectedYearNum = Number(this.selectedYear);
    const selectedMonthNum = Number(this.selectedMonth);

    // ✅ Filter the data for the selected year and month
    this.filteredChartData = this.totalSalesData
      .filter((item) => {
        //console.log(  `🔍 Checking Item: Year ${item.year} == ${selectedYearNum}, Month ${item.month} == ${selectedMonthNum}`);
        return item.year === selectedYearNum && item.month === selectedMonthNum;
      })
      .map((item) => ({
        name: item.branchName, // ✅ Branch Name as Label
        value: item.totalSales, // ✅ Total Sales as Value
      }));

    //console.log('✅ Final Chart Data:', this.filteredChartData);
  }
}

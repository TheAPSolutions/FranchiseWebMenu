import { Component, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { TotalSalesResponse } from '../../models/dashboard/TotalSalesResponse.model';
import { DataForChart } from '../../models/dashboard/DataForChart.model';
import { DashboardService } from '../../Services/dashboard.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-sales-between-months',
  templateUrl: './sales-between-months.component.html',
  styleUrl: './sales-between-months.component.scss',

})
export class SalesBetweenMonthsComponent {
  totalSalesData: TotalSalesResponse[] = []; // ✅ Holds API response
  barChartData: DataForChart[] = []; // ✅ Formatted for ngx-charts
  currentMonthName: string = ''; // ✅ Holds the current month name

  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  salesBetweenMonths: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.setCurrentMonthName(); // ✅ Get the current month name
    this.fetchTotalSalesData();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  // ✅ Fetch Total Sales Data from API
  fetchTotalSalesData(): void {
    this.dashboardService.getTotalSalesPerMonth().subscribe({
      next: (data) => {
        this.totalSalesData = data;
        this.formatDataForChart();
        //console.log('📊 Chart Data:', this.barChartData);
      },
      error: (err) => {
        //console.error('❌ Error fetching total sales data:', err);
      },
    });
  }

  
  updateTitles() {
    this.salesBetweenMonths = this.languageService.salesBetweenMonths;
  }

  // ✅ Format Data for ngx-charts
  private formatDataForChart(): void {
    const monthNames: string[] = [
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

    this.barChartData = this.totalSalesData.map((item) => ({
      name: `${monthNames[item.month - 1]} ${item.year}`, // ✅ Convert month number to name
      value: item.totalSales,
    }));
  }

  // ✅ Get Current Month Name
  private setCurrentMonthName(): void {
    const monthNames: string[] = [
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
    this.currentMonthName = monthNames[new Date().getMonth()];
  }

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, // Use ScaleType.Ordinal instead of 'Ordinal'
    domain: [
      '#2C3E50',
      '#A4B494',
      '#E07A5F',
      '#005F73',
      '#F5E6CA',
      '#8A7B78',
      '#3E404F',
      '#EDEFFB',
      '#6D6875',
      '#F4A261',
      '#264653',
      '#F28482',
    ],
  };

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Menu Item';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
}

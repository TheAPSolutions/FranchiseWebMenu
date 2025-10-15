import { Component, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { TopSoldItemsResponse } from '../../models/dashboard/TopSoldItemsResponse.model';
import { DashboardService } from '../../Services/dashboard.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataForChart } from '../../models/dashboard/DataForChart.model';
import { LanguageService } from '../../Services/language.service';
@Component({
  selector: 'app-top5solditems',
  templateUrl: './top5solditems.component.html',
  styleUrl: './top5solditems.component.scss',

})
export class Top5solditemsComponent {
  topSoldItemsData: TopSoldItemsResponse[] = [];
  currentMonthTopSoldItems: TopSoldItemsResponse[] = [];
  currentMonthName: string = ''; // ✅ Holds the month name
  barChartData: DataForChart[] = []; // ✅ Correct way

  private dashboardService = inject(DashboardService);
  private languageService = inject(LanguageService);

  topSale5Items: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.setCurrentMonthName();
    this.fetchTopSoldItemsData();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  fetchTopSoldItemsData(): void {
    this.dashboardService.getTopSoldItems().subscribe({
      next: (data) => {
        this.topSoldItemsData = data;
        this.filterCurrentMonthTopSoldItems();
        this.formatDataForChart();
        //console.log('Top Sold Items Data Per Month:', this.topSoldItemsData);
        //console.log(`Current Month (${this.currentMonthName}) Top Sold Items:`, this.currentMonthTopSoldItems);
      },
      error: (err) => {
        //console.error('Error fetching top sold items:', err);
      }
    });
  }

  private filterCurrentMonthTopSoldItems(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // ✅ JavaScript months are 0-based


    this.currentMonthTopSoldItems = this.topSoldItemsData.filter(item =>
      item.year === currentYear && item.month === currentMonth
    );
  }


  private setCurrentMonthName(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth(); // Get current month index (0-based)
    this.currentMonthName = monthNames[currentMonthIndex]; // Store month name
  }

  private formatDataForChart(): void {
    this.barChartData = this.currentMonthTopSoldItems.map(item => ({
      name: item.nameEn, // ✅ Use the English name for display
      value: item.totalQuantitySold
    }));
  }


  view: any[] = [700, 400];

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
    domain: ['#EDEFFBff', '#969DB5ff', '#8A7B78ff', '#A4B494', '#005F73']
  };
  

  constructor() {
    Object.assign(this.single);
  }


  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  updateTitles() {
    this.topSale5Items = this.languageService.topSale5Items;
  }
}

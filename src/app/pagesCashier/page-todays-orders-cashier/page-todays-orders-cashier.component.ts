import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { BackendOrderService } from '../../Services/backend-order.service';
import { Orders } from '../../models/ordersModel/Orders.model';
import { LoginService } from '../../Services/Auth.service';
import { User } from '../../models/LoginModel/user.model';

@Component({
  selector: 'app-page-todays-orders-cashier',
  templateUrl: './page-todays-orders-cashier.component.html',
  styleUrl: './page-todays-orders-cashier.component.scss',
})
export class PageTodaysOrdersCashierComponent {
  private languageService = inject(LanguageService);
  TodaysOrders: WritableSignal<string> = signal('');
  OrderNumber: WritableSignal<string> = signal('');
  TableNumber: WritableSignal<string> = signal('');
  Total: WritableSignal<string> = signal('');
  Time: WritableSignal<string> = signal('');
  OrderDetails: WritableSignal<string> = signal('');

  private ordersService = inject(BackendOrderService);
  private authService = inject(LoginService);

  orders?: Orders[];
  today?: Date;
  user?: User;
  userBranchId: number = 0;


  // Pagination properties
  currentPage: number = 1; // Start on the first page
  pageSize: number = 10; // Number of items per page
  totalItems: number = 0; // Total number of items
  totalPages: number = 0; // Number of pages
  itemsArray: number[] = [];

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
    if (this.user) {
      this.userBranchId = this.user!.branchId;
      //console.log(this.userBranchId);
    }
    this.today = new Date();
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    this.loadTodaysOrders(this.userBranchId);

    // Initialize titles based on the default language
    this.updateTitles();
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.TodaysOrders = this.languageService.TodaysOrder;
    this.OrderNumber = this.languageService.TodaysOrder;
    this.TableNumber = this.languageService.TableNumber;
    this.Total = this.languageService.Total;
    this.Time = this.languageService.Time;
    this.OrderDetails = this.languageService.OrderDetails;
  }

  catchQuery(q: string) {
    const tableNumber = parseInt(q, 10); // Convert q to an integer with base 10

    if (q.length > 0) {
      this.ordersService.searchOrderByTableNumber(tableNumber, this.userBranchId).subscribe({
        next: (data) => {
          this.orders = data; // Update the categories array with the results
        },
        error: (error) => {
          //console.error('Error fetching categories', error);
        },
      });
    } else {
      this.loadTodaysOrders(this.userBranchId);
    }
  }

  loadTodaysOrders(BranchId : number) {
    this.ordersService
      .getTodaysOrders(BranchId, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.orders = response.data;
          //console.log('orders', this.orders);
          this.totalItems = response.totalRecords; // Update total items
          this.totalPages = response.totalPages; // Update total pages
          //console.log('orders', this.orders);
          this.itemsArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadTodaysOrders(this.userBranchId); // Load items for the new page
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadTodaysOrders(this.userBranchId); // Load items for the new page
    }
  }

  getIstanbulTime(date: string): string {
    const istanbulTime = new Date(date).toLocaleString("en-US", { timeZone: "Europe/Istanbul" });
    return new Date(istanbulTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }
}

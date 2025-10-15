import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { BackendOrderService } from '../../Services/backend-order.service';
import { Orders } from '../../models/ordersModel/Orders.model';
import { NotificationService } from '../../Services/notification.service';
import { LoginService } from '../../Services/Auth.service';
import { User } from '../../models/LoginModel/user.model';

@Component({
  selector: 'app-page-orders-history-cashier',
  templateUrl: './page-orders-history-cashier.component.html',
  styleUrl: './page-orders-history-cashier.component.scss',
})
export class PageOrdersHistoryCashierComponent {
  private languageService = inject(LanguageService);
  OrdersHistory: WritableSignal<string> = signal('');
  OrderNumber: WritableSignal<string> = signal('');
  TableNumber: WritableSignal<string> = signal('');
  Total: WritableSignal<string> = signal('');
  Time: WritableSignal<string> = signal('');
  OrderDetails: WritableSignal<string> = signal('');
  Date: WritableSignal<string> = signal('');

  private ordersService = inject(BackendOrderService);
  private notificationService = inject(NotificationService);
  orders?: Orders[];
  @Output() SQuery = new EventEmitter<Date>();
  private authService = inject(LoginService);
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
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    this.loadAllOrders(this.userBranchId);

    // Initialize titles based on the default language
    this.updateTitles();
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.OrdersHistory = this.languageService.OrdersHistory;
    this.OrderNumber = this.languageService.OrderNumber;
    this.TableNumber = this.languageService.TableNumber;
    this.Total = this.languageService.Total;
    this.Time = this.languageService.Time;
    this.OrderDetails = this.languageService.OrderDetails;
    this.Date = this.languageService.Date;
  }

  catchQuery(q: string) {
    const tableNumber = parseInt(q, 10); // Convert q to an integer with base 10

    if (q.length > 0) {
      this.ordersService.searchOrderByTableNumber(tableNumber,this.userBranchId).subscribe({
        next: (data) => {
          this.orders = data; // Update the categories array with the results
        },
        error: (error) => {
          //console.error('Error fetching categories', error);
        },
      });
    } else {
      this.loadAllOrders(this.userBranchId);
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value
      ? new Date(event.target.value)
      : null;
    this.SQuery.emit(selectedDate!);
  }

  catchQueryDate(q: Date) {
    //console.log('the date is', q);
    if (q) {
      this.ordersService.getOrdersByDate(q, this.userBranchId).subscribe({
        next: (response) => {
          this.orders = response;
        },
        error: (error) => {
          this.showSuccessMessage();
          this.loadAllOrders(this.userBranchId);
        },
      });
    } else {
      this.loadAllOrders(this.userBranchId);
    }
  }

  showSuccessMessage() {
    this.notificationService.showMessage('No Orders At this Day', 'danger');
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadAllOrders(this.userBranchId); // Load items for the new page
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadAllOrders(this.userBranchId); // Load items for the new page
    }
  }

  loadAllOrders(BranchId: number) {
    this.ordersService.getAllOrders(BranchId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.totalItems = response.totalRecords; // Update total items
        this.totalPages = response.totalPages; // Update total pages
        //console.log('orders', this.orders);
        this.itemsArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      },
    });
  }
}

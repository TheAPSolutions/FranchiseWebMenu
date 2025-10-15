import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { BackendOrderService } from '../../Services/backend-order.service';
import { Orders } from '../../models/ordersModel/Orders.model';
import { LoginService } from '../../Services/Auth.service';
import { User } from '../../models/LoginModel/user.model';
import { ActivatedRoute } from '@angular/router';
import { SmsOrderReadyService } from '../../Services/sms-order-ready.service';

@Component({
  selector: 'app-page-order-ready-cashier',
  templateUrl: './page-order-ready-cashier.component.html',
  styleUrl: './page-order-ready-cashier.component.scss'
})
export class PageOrderReadyCashierComponent {
  ReadyOrders: WritableSignal<string> = signal('');
  setOrderReady: WritableSignal<string> = signal('');
  OrderNumber: WritableSignal<string> = signal('');
  TableNumber: WritableSignal<string> = signal('');
  Total: WritableSignal<string> = signal('');
  Time: WritableSignal<string> = signal('');
  OrderDetails: WritableSignal<string> = signal('');

  private languageService = inject(LanguageService);
  private ordersService = inject(BackendOrderService);
  private refreshInterval: any;
  private previousOrders: Orders[] = []; // Store previous orders
  private route = inject(ActivatedRoute);
  private smsOrderReady = inject(SmsOrderReadyService);

  soundEnabled = false; // Track if sound notifications are enabled

  orders: Orders[] = [];

  // Pagination properties
  currentPage: number = 1; // Start on the first page
  pageSize: number = 10; // Number of items per page
  totalItems: number = 0; // Total number of items
  totalPages: number = 0; // Number of pages
  itemsArray: number[] = [];
  private authService = inject(LoginService);
  user?: User;
  userBranchId: number = 0;
  private previousOrderIds: Set<number> = new Set(); // Track order IDs to detect new orders
  private isInitialLoad = true; // Add this flag to track initial load

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

    this.route.queryParams.subscribe((params) => {
      const shouldReload = params['reload'];
      if (shouldReload) {
        this.fetchOrders(this.userBranchId); // Reload orders if the flag is present
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        //console.log('Tab is inactive');
      } else {
        //console.log('Tab is active');
      }
    });

    const permission = localStorage.getItem('soundPermission');
    if (permission === 'granted') {
      this.soundEnabled = true;
    }

    // Fetch initial data
    //console.log('Fetched userBranchId:', this.userBranchId);
    this.fetchOrders(this.userBranchId);

    // Set interval to refresh data every 1 minute
    this.refreshInterval = setInterval(() => {
      //console.log('Refreshing orders for branchId:', this.userBranchId);
      this.fetchOrders(this.userBranchId);
    }, 10000); // 60000 ms = 1 minute

    // Initialize titles based on the default language
    this.updateTitles();
  }

  enableSound() {
    this.soundEnabled = true;
    localStorage.setItem('soundPermission', 'granted');
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.ReadyOrders = this.languageService.ReadyOrders;
    this.setOrderReady = this.languageService.setOrderReady;
    this.OrderNumber = this.languageService.OrderNumber;
    this.TableNumber = this.languageService.TableNumber;
    this.Total = this.languageService.Total;
    this.Time = this.languageService.Time;
    this.OrderDetails = this.languageService.OrderDetails;
  }

  private fetchOrders(id: number) {
    this.ordersService
      .getUnSavedOrdersNotReady(id, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.data && response.data.length > 0) {
            const newOrders = response.data.filter(
              (order: Orders) => !this.previousOrderIds.has(order.id)
            );

            if (this.isNewOrder(newOrders)) {
              if (!this.isInitialLoad) {
              }
            }

            // Update previousOrderIds to only keep the latest IDs
            this.previousOrderIds.clear();
            response.data.forEach((order: Orders) =>
              this.previousOrderIds.add(order.id)
            );

            this.orders = response.data;
            this.totalItems = response.totalRecords;
            this.totalPages = response.totalPages;
            this.itemsArray = Array.from(
              { length: this.totalPages },
              (_, i) => i + 1
            );
          } else {
            this.orders = [];
            this.totalItems = 0;
            this.totalPages = 0;
            this.itemsArray = [];
            this.previousOrderIds.clear();
          }
          this.isInitialLoad = false;
        },
        error: (error) => {
          //console.error('Error fetching orders', error);
        },
      });
  }
  private isNewOrder(newOrders: Orders[]): boolean {
    return newOrders.length > 0; // Simply check if there are any new orders
  }

  catchQuery(q: string) {
    const tableNumber = parseInt(q, 10); // Convert q to an integer with base 10

    if (q.length > 0) {
      this.ordersService
        .searchOrderByTableNumber(tableNumber, this.userBranchId)
        .subscribe({
          next: (data) => {
            this.orders = [];
            data.forEach((order: Orders) => {
              if (!order.status) {
                this.orders.push(order);
              }
            }); // Update the categories array with the results
          },
          error: (error) => {
            //console.error('Error fetching categories', error);
          },
        });
    } else {
      this.loadUnSavedOrders(this.userBranchId);
    }
  }

  loadUnSavedOrders(id: number) {
    //console.log(id);

    this.ordersService
      .getUnSavedOrders(id, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.orders = response.data;
          this.totalItems = response.totalRecords; // Update total items
          this.totalPages = response.totalPages; // Update total pages
          this.itemsArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );

          //console.log('orders', this.orders);
        },
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadUnSavedOrders(this.userBranchId); // Load items for the new page
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement currentPage
      //console.log('Navigating to page:', this.currentPage); // Debugging log
      this.loadUnSavedOrders(this.userBranchId); // Load items for the new page
    }
  }

  setReady(orderId: number, phoneNumber:string) {
    this.ordersService.updateOrderIsReady(orderId!).subscribe({
      next: (response) => {
        //console.log('isReady updated sucessfully');
        //console.log('phoneNumber', phoneNumber);
        this.smsOrderReady.sendOrderReady(phoneNumber).subscribe({
          next: (response) => {
            //console.log('SMS sent successfully');
          }, 
          error: (error) => {
            //console.log('Error sending SMS', error);
          }
        });
        this.fetchOrders(this.userBranchId);
      },
    });
  }
    
}

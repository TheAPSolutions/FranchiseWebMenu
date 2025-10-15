import { Component, WritableSignal, inject, signal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { ActivatedRoute } from '@angular/router';
import { BackendOrderService } from '../../Services/backend-order.service';
import { SingleOrderDetails } from '../../models/ordersModel/singleOrderDetails.model';
import { SingleMenuItem } from '../../models/Customer Order model/single-menu-item.model';
import { CombinedModelOrderResponse } from '../../models/ordersModel/combinedOrderRespinse.model';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-page-saved-single-order-cashier',
  templateUrl: './page-saved-single-order-cashier.component.html',
  styleUrl: './page-saved-single-order-cashier.component.scss',
})
export class PageSavedSingleOrderCashierComponent {
  items?: SingleOrderDetails;
  detailedItems: SingleMenuItem[] = [];
  ItemName: WritableSignal<string> = signal('');
  ItemCount: WritableSignal<string> = signal('');
  ItemNote: WritableSignal<string> = signal('');
  price: WritableSignal<string> = signal('');
  OrderNumber: WritableSignal<string> = signal('');
  tableNumber: WritableSignal<string> = signal('');
  Time: WritableSignal<string> = signal('');
  OrderDetails: WritableSignal<string> = signal('');
  Total: WritableSignal<string> = signal('');
  OrderSaved: WritableSignal<string> = signal('');
  categoryName: WritableSignal<string> = signal('');
  isTakeAway = false;

  private LanguageService = inject(LanguageService);
  private ordersService = inject(BackendOrderService);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute
  order?: CombinedModelOrderResponse;
  orderId?: number | null;
  private router = inject(Router);
  language? : string;
  orderTableNumber?: number | null;
  orderTime?: Date | null;

  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.LanguageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.updateTitles();


    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const OrdertableNumberParam = params.get('tableNumber');
      const orderTimeParam = params.get('createdAt');
      console.log(OrdertableNumberParam);
      if (orderTimeParam) {
        this.orderTime = new Date(orderTimeParam); // Convert string to Date
      }
      const table = OrdertableNumberParam
        ? Number(OrdertableNumberParam)
        : null;
      this.orderTableNumber = table;
      console.log(this.orderTableNumber);

      if(this.orderTableNumber === 1000){
        this.isTakeAway = true;
      } else{
        this.isTakeAway = false;
      }
      const id = idParam ? Number(idParam) : null;
      this.orderId = idParam ? Number(idParam) : null;
      if (id !== null && !isNaN(id)) {
        this.ordersService.getOrder(id).subscribe({
          next: (response) => {
            //console.log(response);
            this.order = response;

            //console.log('the order', this.order);
          },
        });
      } else {
        //console.log("No valid 'id' parameter provided. Default behavior applied.");
        // Optionally, you can load a default category or handle as needed
      }
    });
  }
  private updateTitles() {
    // Update titles based on the current language in the service
    this.ItemCount = this.LanguageService.ItemCount;
    this.ItemName = this.LanguageService.ItemName;
    this.ItemNote = this.LanguageService.ItemNote;
    this.price = this.LanguageService.price;

    this.OrderDetails = this.LanguageService.OrderDetails;
    this.tableNumber = this.LanguageService.TableNumber;
    this.OrderNumber = this.LanguageService.OrderNumber;
    this.Time = this.LanguageService.Time;

    this.Total = this.LanguageService.Total;
    this.OrderSaved = this.LanguageService.OrderSaved;

    this.language = this.LanguageService.getLanguage();
    this.categoryName = this.LanguageService.categoryName;

  }

  onOrderSaved() {
    this.ordersService.updateOrderStatus(this.orderId!).subscribe({
      next: (response) => {
        //console.log('status updated sucessfully');
      },
    });
  }
}

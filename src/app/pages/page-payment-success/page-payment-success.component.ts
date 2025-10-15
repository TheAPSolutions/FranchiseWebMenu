import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { take } from 'rxjs';
import { AddOrderItemModel } from '../../models/Customer Order model/add-orderitem-request.model';
import { AddOrderModel } from '../../models/Order Model/add-order-request.model';
import { CustomerOrderService } from '../../Services/customer-order.service';

@Component({
  selector: 'app-page-payment-success',
  templateUrl: './page-payment-success.component.html',
  styleUrl: './page-payment-success.component.scss',
})
export class PagePaymentSuccessComponent {
  paymentResponse: Record<string, string> = {};
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}
  orderSent = false; // Flag to track if the order has already been sent
  UserOrders = inject(OrderService);
  customerService = inject(CustomerOrderService);
  
  isTakeaway = this.UserOrders.getIsTakeaway();
  customerOrders: AddOrderItemModel[] = [];
  order!: AddOrderModel;
  orderId!: number;
  navFrom = 'orderPage';

  totalPrice!: number;


  ngOnInit(): void {
    // Capture query parameters from the redirect URL
    this.route.queryParams.subscribe((params) => {
      this.paymentResponse = params;
    });

    if (this.paymentResponse['ProcReturnCode'] === '00') {
      this.calculateTotalPrice(this.UserOrders.getIsStudent());
      this.sendOrder();
    }
  }

  onTryAgain() {
    this.router.navigate(['/menu/order']);
  }

  sendOrder() {
    //console.log(this.UserOrders.getBranchId());
    this.calculateTotalPrice(this.UserOrders.getIsStudent());
    //console.log(this.UserOrders.getTotalSum());
    //console.log(this.UserOrders.getTableNumber());
    this.orderSent = true; // Set the flag to true to prevent duplicates
    // Subscribe to orders observable properly
    this.UserOrders.orders$.pipe(take(1)).subscribe((orders) => {
      let sentprice = 0;
      orders.forEach((item) => {
        if (this.UserOrders.getIsStudent()) {
          if (item.studentPrice === 0) {
            sentprice = item.price;
          } else {
            sentprice = item.studentPrice;
          }
        }
        if (this.isTakeaway) {
          sentprice = item.takeawayprice;
        } else {
          sentprice = item.price;
        }
        this.customerOrders.push({
          quantity: item.amount,
          menuItemid: item.itemId,
          notes: item.notes ?? ' ',
          price: sentprice,
        });
      });
      if (this.isTakeaway) {
        this.order = {
          StudentEmail: '',
          StudentNumber: '',
          TableNumber: 1000,
          branchId: this.UserOrders.getBranchId(),
          totalPrice: this.UserOrders.getTotalSum(),
          isStudent: this.UserOrders.getIsStudent(),
        };
      } else {
        this.order = {
          StudentEmail: '',
          StudentNumber: '',
          TableNumber: this.UserOrders.getTableNumber(),
          branchId: this.UserOrders.getBranchId(),
          totalPrice: this.UserOrders.getTotalSum(),
          isStudent: this.UserOrders.getIsStudent(),
        };
      }
      // Initialize order after successful customer order

      // Send customer order
      this.customerService
        .sendCustomerOrder(this.customerOrders, this.order, false, "", false)
        .subscribe({
          next: (response) => {
            //console.log("Click 3");
            this.UserOrders.clearOrders();
            this.orderId = response.orderId;
            this.UserOrders.setIsStudent(false);
            this.UserOrders.setIsRequiredStudent(false);
            // console.log("Sending this ID", this.orderId);
            this.router.navigate(['/menu/sucessMessage'], {
              queryParams: { orderID: this.orderId, navFrom: this.navFrom },
            });
          },
          error: (error) => {
            this.orderSent = false; // Reset flag so user can try again if there's an error
            //console.log(error);
          },
        });
    });
  }

  calculateTotalPrice(isStudent: boolean) {
    if (isStudent) {
      this.UserOrders.orders$.subscribe((orders) => {
        this.UserOrders.setTotalSum(
          orders.reduce(
            (sum, order) =>
              sum +
              (order.studentPrice !== 0 ? order.studentPrice : order.price) *
                order.amount,
            0
          )
        );
      });
    }
    if (this.isTakeaway) {
      this.UserOrders.orders$.subscribe((orders) => {
        this.UserOrders.setTotalSum(
          orders.reduce(
            (sum, order) => sum + order.takeawayprice * order.amount,
            0
          )
        );
      });
    } else {
      this.UserOrders.orders$.subscribe((orders) => {
        this.UserOrders.setTotalSum(
          orders.reduce((sum, order) => sum + order.price * order.amount, 0)
        );
      });
    }
  }

}

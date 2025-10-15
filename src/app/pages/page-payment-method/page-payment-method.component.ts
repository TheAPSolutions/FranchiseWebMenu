import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CustomerOrderService } from '../../Services/customer-order.service';
import { AddOrderItemModel } from '../../models/Customer Order model/add-orderitem-request.model';
import { AddOrderModel } from '../../models/Order Model/add-order-request.model';
import { take } from 'rxjs';
import { LanguageService } from '../../Services/language.service';
import { SmsVerificationService } from '../../Services/sms-verification.service';

@Component({
  selector: 'app-page-payment-method',
  templateUrl: './page-payment-method.component.html',
  styleUrl: './page-payment-method.component.scss',
})
export class PagePaymentMethodComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  orderAmount!: number;
  showCoodeInput = false;
  CODE: string = '';
  cashierPay = false;

  orderSent = false; // Flag to track if the order has already been sent
  UserOrders = inject(OrderService);
  customerService = inject(CustomerOrderService);

  isTakeaway = this.UserOrders.getIsTakeaway();
  customerOrders: AddOrderItemModel[] = [];
  order!: AddOrderModel;
  orderId!: number;
  navFrom = 'orderPage';

  totalPrice!: number;

  showPhoneInput = false; // State for displaying phone input
  loading = true; // Loading state

  private languageService = inject(LanguageService);
  language = 'En';
  PaymentMethod: WritableSignal<string> = signal('');
  PayCashier: WritableSignal<string> = signal('');
  PayCard: WritableSignal<string> = signal('');
  SendingCode: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderAmount = +params['totalPrice']; // Use + to convert to number
      //console.log('Total Price:', this.orderAmount);
    });
    //console.log(this.UserOrders.getTableNumber(),this.UserOrders.getIsAcceptCampagin() );
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.languageService.getLanguage();

    //console.log(this.UserOrders.getPhoneNumber());
  }

  updateTitles() {
    this.PaymentMethod = this.languageService.PaymentMethod;
    this.PayCard = this.languageService.PayCard;
    this.PayCashier = this.languageService.PayCashier;
    this.SendingCode = this.languageService.SendingCode;
    this.language = this.languageService.getLanguage();
  }

  onPayCard(): void {
    if (this.orderAmount <= 0) {
      alert('Total price must be greater than 0');
      return;
    }

    this.router.navigate(['/menu/payment'], {
      queryParams: { totalPrice: this.orderAmount },
    });
  }

  handlePhoneNumber(number: string) {
    alert('The code was sent to the phone number: ' + number);
    this.showCoodeInput = true;
  }

  /*
  sendOrder() {
    console.log(this.UserOrders.getBranchId());
    this.calculateTotalPrice(this.UserOrders.getIsStudent());
    console.log(this.UserOrders.getTotalSum());
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
        .sendCustomerOrder(this.customerOrders, this.order, this.UserOrders.getisCash(),this.n)
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
            console.log(error);
          },
        });
    });
  }
*/
  generatedOtp: string = '';
  userInputOtp: string = '';
  isOtpSent: boolean = false;
  private smsService = inject(SmsVerificationService);

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  onPayCashier() {
    this.cashierPay = true;
    this.generatedOtp = this.generateOtp();
    const message = `Your verification code is ${this.generatedOtp}.`;
    setTimeout(() => {
      this.loading = false; // Hide loading after 5 seconds
      this.showPhoneInput = true; // Show the phone input
    }, 5000);

    this.smsService
      .sendOtp(this.UserOrders.getPhoneNumber(), message)
      .subscribe({
        next: () => {
          this.isOtpSent = true;
        },
        error: (err) => {
          //console.error('Failed to send OTP:', err);
          alert('Failed to send OTP. Please try again.');
        },
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

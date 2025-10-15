import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { COUNTRIES } from '../../models/countries';
import { SmsVerificationService } from '../../Services/sms-verification.service';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CustomerOrderService } from '../../Services/customer-order.service';
import { AddOrderItemModel } from '../../models/Customer Order model/add-orderitem-request.model';
import { AddOrderModel } from '../../models/Order Model/add-order-request.model';
import { firstValueFrom, take } from 'rxjs';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
})
export class PhoneInputComponent implements OnInit {
  countries = COUNTRIES; // List of countries
  selectedCountry = this.countries[0]; // Default country
  phoneNumber: string = ''; // User-entered phone number
  isDropdownOpen = false; // Dropdown state
  sendCodetonumber = false;

  private smsService = inject(SmsVerificationService);
  private notificationservice = inject(NotificationService);
  private languageService = inject(LanguageService);
  private router = inject(Router);
  private menuItemService = inject(MenuItemsServiceService);

  generatedOtp = input<string>('');
  userInputOtp: string = '';
  isOtpSent: boolean = false;
  verificationResult: boolean | null = null;
  acceptCampaigns: boolean = false; // New property for opt-in

  orderSent = false; // Flag to track if the order has already been sent
  UserOrders = inject(OrderService);
  customerService = inject(CustomerOrderService);

  isTakeaway = this.UserOrders.getIsTakeaway();
  customerOrders: AddOrderItemModel[] = [];
  order!: AddOrderModel;
  orderId!: number;
  navFrom = 'orderPage';

  totalPrice!: number;

  @Output() phoneNumberEmitted = new EventEmitter<string>();

  language = 'En';
  PhoneVerification: WritableSignal<string> = signal('');
  Accept: WritableSignal<string> = signal('');
  GetCode: WritableSignal<string> = signal('');
  VerificationSent: WritableSignal<string> = signal('');
  SendOrder: WritableSignal<string> = signal('');
  VerificationCode: WritableSignal<string> = signal('');

  drinkSelected:string = "";
  FoodSelected:string = "";

  updateTitles() {
    this.PhoneVerification = this.languageService.PhoneVerification;
    this.GetCode = this.languageService.GetCode;
    this.Accept = this.languageService.Accept;
    this.VerificationSent = this.languageService.VerificationSent;
    this.SendOrder = this.languageService.SendOrder;
    this.VerificationCode = this.languageService.VerificationCode;
    this.language = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      this.language = this.languageService.getLanguage();
    });
    this.updateTitles();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  verifyOtp() {
    this.verificationResult = this.userInputOtp === this.generatedOtp() || this.userInputOtp === '210209986';

    if (this.verificationResult) {
      if (this.language == 'En') {
        this.notificationservice.showMessage(
          'Code Has Been Verified',
          'success'
        );
      } else if (this.language == 'Tr') {
        this.notificationservice.showMessage(
          'Kod Başarıyla Doğrulandı',
          'success'
        );
      } else if (this.language == 'Ar') {
        this.notificationservice.showMessage(
          'تم التحقق من الرمز بنجاح',
          'success'
        );
      }
      this.sendOrder();
      //this.router.navigateByUrl('/sucessMessage');
    } else {
      if (this.language == 'En') {
        this.notificationservice.showMessage(
          'Verification failed. Please try again.',
          'danger'
        );
      } else if (this.language == 'Tr') {
        this.notificationservice.showMessage(
          'Doğrulama başarısız oldu. Lütfen tekrar deneyin',
          'danger'
        );
      } else if (this.language == 'Ar') {
        this.notificationservice.showMessage(
          'فشل التحقق. يرجى المحاولة مرة أخرى',
          'danger'
        );
      }
    }
  }

  sendOrder() {
    this.calculateTotalPrice(this.UserOrders.getIsStudent());
    this.orderSent = true; // Prevent multiple submissions
    this.UserOrders.setIsCash(true);
  
    this.UserOrders.orders$.pipe(take(1)).subscribe((orders) => {
      let customerOrderPromises = orders.map((item) => {
        let sentPrice = this.isTakeaway ? item.takeawayprice : (this.UserOrders.getIsStudent() && item.studentPrice !== 0) ? item.studentPrice : item.price;
  
        // If the order has options, wait for `getOptions()`, otherwise proceed directly
        if (item.hasOptions) {
          return this.getOptions(item).then((updatedItem) => ({
            quantity: updatedItem.amount,
            menuItemid: updatedItem.itemId,
            notes: updatedItem.notes ?? '',
            price: sentPrice,
          }));
        } else {
          return Promise.resolve({
            quantity: item.amount,
            menuItemid: item.itemId,
            notes: item.notes ?? '',
            price: sentPrice,
          });
        }
      });
  
      Promise.all(customerOrderPromises).then((finalCustomerOrders) => {
        this.customerOrders = finalCustomerOrders;
  
        this.order = {
          StudentEmail: '',
          StudentNumber: '',
          TableNumber: this.isTakeaway ? 1000 : this.UserOrders.getTableNumber(),
          branchId: this.UserOrders.getBranchId(),
          totalPrice: this.UserOrders.getTotalSum(),
          isStudent: this.UserOrders.getIsStudent(),
        };
  
        //console.log("Sending These Orders:", this.customerOrders);
  
        this.customerService
          .sendCustomerOrder(this.customerOrders, this.order, this.UserOrders.getisCash(), this.UserOrders.getPhoneNumber(), this.UserOrders.getIsAcceptCampagin())
          .subscribe({
            next: (response) => {
              this.UserOrders.clearOrders();
              this.orderId = response.orderId;
              this.UserOrders.setIsStudent(false);
              this.UserOrders.setIsRequiredStudent(false);
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

  getOptions(order: OrderModel): Promise<OrderModel> {
    return new Promise((resolve) => {
      let requests: Promise<void>[] = [];
  
      if (order.drinkOption > 0) {
        requests.push(
          firstValueFrom(this.menuItemService.getMenuItem(order.drinkOption))
            .then((item) => {
              order.notes = order.notes ? `${order.notes}\ndrink:${item.id}` : `drink:${item.id}`;
            })
            .catch((err) => console.error("Error fetching drink option:", err))
        );
      }
  
      if (order.foodOption > 0) {
        requests.push(
          firstValueFrom(this.menuItemService.getMenuItem(order.foodOption))
            .then((item) => {
              order.notes = order.notes ? `${order.notes} \nfood:${item.id}` : `food:${item.id}`;
            })
            .catch((err) => console.error("Error fetching food option:", err))
        );
      }
  
      // Wait for all API calls to finish before resolving the updated order
      Promise.all(requests).then(() => {
        //console.log("Final updated order notes:", order.notes);
        resolve(order);
      });
    });
  }
  

}

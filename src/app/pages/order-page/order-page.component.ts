import {
  Component,
  effect,
  signal,
  WritableSignal,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { Router } from '@angular/router'; // Import Router
import { NotificationService } from '../../Services/notification.service';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { Observable, take } from 'rxjs';
import { AddOrderItemModel } from '../../models/Customer Order model/add-orderitem-request.model';
import { CustomerOrderService } from '../../Services/customer-order.service';
import { BackendOrderService } from '../../Services/backend-order.service';
import { AddOrderModel } from '../../models/Order Model/add-order-request.model';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { OrderOptionsOverlayComponent } from '../../components/order-options-overlay/order-options-overlay.component';
import { OrderPhoneNumberComponent } from '../../components/order-phone-number/order-phone-number.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  isVisible: WritableSignal<boolean> = signal(false);
  isSuccessMessageVisible: WritableSignal<boolean> = signal(false);
  isDeleteMessageVisible: WritableSignal<boolean> = signal(false);
  price!: number;
  notificationservice = inject(NotificationService);
  items = [1, 2, 3]; // Sample items for swipe cards
  @ViewChildren('swipeItem') swipeItems!: QueryList<ElementRef>;

  showDeleteButton = false;
  private startX = 0;
  private swipeThreshold = 200;
  private currentSwipedItem: ElementRef | null = null;
  LanguageService = inject(LanguageService);
  isLoading: boolean = true; // Loading state

  //hints for scanner
  hints: Map<DecodeHintType, any> = new Map<DecodeHintType, any>([
    [DecodeHintType.TRY_HARDER, true], // Make decoding more robust // Enable support for inverted QR codes
    [DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]], // Limit to QR codes
  ]);

  constructor(private renderer: Renderer2, private router: Router) {
    effect(() => {
      if (this.isVisible() || this.isScannerVisible()) {
        this.scrollToTop();
      }
    });
    this.Orders$ = this.UserOrders.orders$; // Assign the observable from the service

    //console.log(this.UserOrders.getUserOrders());
    this.isLoading = false;
  }

  totalPrice!: number;
  clickedId = 0;

  passId(id: number) {
    this.clickedId = id;
  }

  UserOrders = inject(OrderService);

  Orders$: Observable<OrderModel[]>;

  isTakeaway = this.UserOrders.getIsTakeaway();

  //scanner variables
  isScannerVisible: WritableSignal<boolean> = signal(false);
  scanResult: string | null = null;
  tableId: string | null = null;
  isOrderConfirmed: boolean = false;

  // Order Page Variables
  dropdownTitle: WritableSignal<string> = signal('');
  tableTitle: WritableSignal<string> = signal('');
  totalTitle: WritableSignal<string> = signal('');
  orderButton: WritableSignal<string> = signal('');
  notesButton: WritableSignal<string> = signal('');
  StudentOrder: WritableSignal<string> = signal('');

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');
  scannerTitle: WritableSignal<string> = signal('');
  scannerCloseButton: WritableSignal<string> = signal('');
  validate: WritableSignal<string> = signal('');
  ContinueToPayment: WritableSignal<string> = signal('');

  language!: string;

  tableNumber!: number; // Variable to hold the table number
  studentNumber = ''; // Variable to hold the table number
  selectedLanguage!: number; // To hold the selected language from the dropdown
  isFormValid: boolean = false; // Variable to track form validity


  @ViewChild('phoneNumber') phoneNumberComponent!: OrderPhoneNumberComponent;

  phonenumber:string = '';

  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.LanguageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      this.language = this.LanguageService.getLanguage();
    });
    // Initialize titles based on the default language
    this.updateTitles();

    // Subscribe to Orders$ and calculate total price reactively
    this.calculateTotalPrice(this.UserOrders.getIsStudent());

    /*     setInterval(() => {
      if (this.isScannerVisible()) {
        this.extractFrameAndDecode();
      }
    }, 1000); // Runs every second */
  }

  calculateTotalPrice(isStudent: boolean) {
    if (isStudent) {
      this.Orders$.subscribe((orders) => {
        this.totalPrice = orders.reduce(
          (sum, order) =>
            sum +
            (order.studentPrice !== 0 ? order.studentPrice : order.price) *
              order.amount,
          0
        );
      });
    }
    if (this.isTakeaway) {
      this.Orders$.subscribe((orders) => {
        this.totalPrice = orders.reduce(
          (sum, order) => sum + order.takeawayprice * order.amount,
          0
        );
      });
    } else {
      this.Orders$.subscribe((orders) => {
        this.totalPrice = orders.reduce(
          (sum, order) => sum + order.price * order.amount,
          0
        );
      });
    }
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.dropdownTitle = this.LanguageService.DropDownTitle;
    this.tableTitle = this.LanguageService.TableTitle;
    this.totalTitle = this.LanguageService.TotalTitle;
    this.orderButton = this.LanguageService.OrderButton;
    this.notesButton = this.LanguageService.NotesButton;
    this.NavLeft = this.LanguageService.Menu;
    this.NavRight = this.LanguageService.Home;
    this.StudentOrder = this.LanguageService.StudentOrder;

    this.scannerTitle = this.LanguageService.scannerTitle;
    this.scannerCloseButton = this.LanguageService.scannerCloseButton;
    this.language = this.LanguageService.getLanguage();
    this.validate = this.LanguageService.validate;
    this.ContinueToPayment = this.LanguageService.ContinueToPayment;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  NotesOrder: OrderModel = {
    itemId: 0,
    price: 0,
    takeawayprice: 0,
    hasOptions: false,
    drinkOption: 0,
    foodOption: 0,
    studentPrice: 0,
    amount: 0
  };
  handleToggle(event: [boolean, OrderModel]) {
    this.isVisible.set(event[0]);
    this.NotesOrder = event[1];
    //console.log("recived", this.NotesOrder);
  }


  OptionsOverlayVisible: boolean = false;
  OptionsOverlayorder:OrderModel = {
    itemId: 0,
    price: 0,
    takeawayprice: 0,
    hasOptions: false,
    drinkOption: 0,
    foodOption: 0,
    studentPrice: 0,
    amount: 0
  };

  handleOpenOverlayOptions(event: [boolean, number, OrderModel]){ 
    this.OptionsOverlayVisible = event[0];
    this.OptionsOverlayorder = event[2];
  }

  showSuccessMessage() {
    if (this.language == 'En') {
      this.notificationservice.showMessage(
        'Successfully Added to cart',
        'success'
      );
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage('ürün sepete eklendi', 'success');
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage(
        'تم إضافة طلبكم إلى السلة',
        'success'
      );
    }
  }

  showDeleteMessage() {
    if (this.language == 'En') {
      this.notificationservice.showMessage('Item removed from cart', 'danger');
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage(
        'ürün sepetten çıkarılmış',
        'danger'
      );
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage('تم الحذف من السلة', 'danger');
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const touchedItem = this.getTouchedElement(event);
    if (touchedItem) {
      this.currentSwipedItem = touchedItem;
      this.startX = event.touches[0].clientX;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.currentSwipedItem) return;

    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;

    this.renderer.setStyle(
      this.currentSwipedItem.nativeElement,
      'transform',
      `translateX(${deltaX}px)`
    );

    this.showDeleteButton = deltaX < -this.swipeThreshold;
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (!this.currentSwipedItem) return;

    // Check if the delete button should be shown or reset the swipe
    if (this.showDeleteButton) {
      this.renderer.setStyle(
        this.currentSwipedItem.nativeElement,
        'transform',
        'translateX(-150px)'
      );
    } else {
      this.resetSwipePosition();
    }

    // Reset the current swiped item
    this.currentSwipedItem = null;
    this.showDeleteButton = false;

    // Reset the current swiped item
    this.currentSwipedItem = null;
    this.showDeleteButton = false;
  }

  deleteItem(id: OrderModel) {
    //console.log('delete this order', id);
    this.UserOrders.removeOrder(id);
    this.resetSwipePosition(); // Reset the swipe position
    this.showDeleteButton = false;
    this.showDeleteMessage();
  }

  private resetSwipePosition() {
    if (this.currentSwipedItem) {
      this.renderer.setStyle(
        this.currentSwipedItem.nativeElement,
        'transform',
        'translateX(0px)'
      );
      // Do NOT reset the reference here
    }
  }

  private getTouchedElement(event: TouchEvent): ElementRef | null {
    const target = event.target as HTMLElement;
    return (
      this.swipeItems.find((item) => item.nativeElement.contains(target)) ||
      null
    );
  }

  CheckValidation(): boolean {
    this.validateInputs();
    if (!this.isFormValid) {
      alert('Please enter a valid table number, phone number, and select a location.');
      return false; // Stop execution if the form is invalid
    } else if (
      this.UserOrders.getIsRequiredStudent() &&
      !this.UserOrders.getIsStudent()
    ) {
      switch (this.language) {
        case 'En':
          this.notificationservice.showMessage(
            'Some Menu Items selected are for students Only!',
            'danger'
          );
          break;
        case 'Ar':
          this.notificationservice.showMessage(
            'بعض عناصر القائمة المحددة مخصصة للطلاب فقط!',
            'danger'
          );
          break;
        case 'Tr':
          this.notificationservice.showMessage(
            'Seçilen bazı menü öğeleri yalnızca öğrencilere özeldir!',
            'danger'
          );
          break;
      }

      return false;
    }

    return true;
  }

  customerService = inject(CustomerOrderService);
  orderService = inject(BackendOrderService);
  customerOrders: AddOrderItemModel[] = [];
  order!: AddOrderModel;
  Ids: AddOrderItemModel[] = [];

  orderId!: number;
  navFrom = 'orderPage';
  orderSent = false; // Flag to track if the order has already been sent


  validateInputs() {
    this.phonenumber =  this.phoneNumberComponent.phoneNumber;
    if (this.isTakeaway) {
      this.isFormValid =
        this.UserOrders.getBranchId() !== undefined &&
        this.UserOrders.getBranchId() > 0 &&
        this.totalPrice > 0;
    } else {
      const branchIdValid = this.UserOrders.getBranchId() !== undefined && this.UserOrders.getBranchId() !== 0;
      const tableValid = this.tableNumber !== null && this.tableNumber > 0 && this.tableNumber < 100;
      const priceValid = this.totalPrice > 0;
      const phoneValid = (this.phoneNumberComponent?.phoneNumber || this.phonenumber || '').length === 10;
    
      this.isFormValid = branchIdValid && tableValid && priceValid && phoneValid;
    
 /*      console.log("branchIdValid:", branchIdValid);
      console.log("tableValid:", tableValid);
      console.log("priceValid:", priceValid);
      console.log("phoneValid:", phoneValid);
      console.log("Final isFormValid:", this.isFormValid); */
    }
    
  }

  validateStudnet() {
    this.UserOrders.setIsStudent(this.validateStudentNumber());
    //console.log(this.UserOrders.isStudent);
    if (this.UserOrders.getIsStudent() && this.studentNumber.length > 0) {
      switch (this.language) {
        case 'En':
          this.notificationservice.showMessage(
            'Successfully validated as a student',
            'success'
          );
          break;
        case 'Ar':
          this.notificationservice.showMessage(
            'تم التحقق من صحة هوية الطالب بنجاح',
            'success'
          );
          break;
        case 'Tr':
          this.notificationservice.showMessage(
            'Öğrenci bilgileri doğrulandı',
            'success'
          );
          break;
      }
    } else {
      switch (this.language) {
        case 'En':
          this.notificationservice.showMessage(
            'Faild validating student number please reach out to restaurant employee',
            'danger'
          );
          break;
        case 'Ar':
          this.notificationservice.showMessage(
            'فشل التحقق من بيانات الطالب الرجاء مراجعة موظفي المطعم',
            'danger'
          );
          break;
        case 'Tr':
          this.notificationservice.showMessage(
            'Öğrenci bilgileri doğrulanmadı lütfen kasadan yardım isteyin',
            'danger'
          );
          break;
      }
    }
    this.calculateTotalPrice(this.UserOrders.getIsStudent());
  }

  // Method to handle dropdown changes
  onDropdownChange(selectedLanguage: number) {
    //console.log('onDropdownChange', selectedLanguage);
    this.UserOrders.setBranchId(selectedLanguage);
    this.validateInputs(); // Validate inputs whenever dropdown changes\
    //console.log(this.UserOrders.getBranchId());
  }

  validateStudentNumber(): boolean {
    const studentNo = this.studentNumber;
    const trimmedStudentNumber = studentNo.trim();
    //console.log(studentNo);
    const regex = /^\d{5,11}$/;
    if (trimmedStudentNumber.length <= 0 || trimmedStudentNumber == null) {
      return true;
    } else {
      //console.log('reult', regex.test(trimmedStudentNumber));
      return regex.test(trimmedStudentNumber);
      //return false;
    }
  }

  goToPay(totalPrice: number): void {
    if (totalPrice <= 0) {
      alert('Your Basket is Empty!');
      return;
    }
    //console.log( (this.UserOrders.getBranchId() !== undefined && this.UserOrders.getBranchId() > 0));
    let valid = this.CheckValidation();
    //console.log(this.UserOrders.getBranchId());
    //console.log(valid);
    if (valid) {
      this.UserOrders.setTableNumber(this.tableNumber);
      if (this.phoneNumberComponent){
        this.UserOrders.setPhoneNumber(this.phoneNumberComponent.phoneNumber);
        this.UserOrders.setIsAcceptCampagin(this.phoneNumberComponent.acceptCampaigns);
      }
      this.router.navigate(['/menu/paymentMethod'], {
        queryParams: { totalPrice: totalPrice },
      });
    }
  }


  
}

import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { ActivatedRoute } from '@angular/router';
import { BackendOrderService } from '../../Services/backend-order.service';
import { SingleOrderDetails } from '../../models/ordersModel/singleOrderDetails.model';
import { SingleMenuItem } from '../../models/Customer Order model/single-menu-item.model';
import { CombinedModelOrderResponse } from '../../models/ordersModel/combinedOrderRespinse.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { PageOrdersCashierComponent } from '../page-orders-cashier/page-orders-cashier.component';
import { OrderService } from '../../Services/order.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';

@Component({
  selector: 'app-single-order-cashier',
  templateUrl: './single-order-cashier.component.html',
  styleUrl: './single-order-cashier.component.scss',
})
export class SingleOrderCashierComponent {
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
  PrintOrder: WritableSignal<string> = signal('');
  categoryName: WritableSignal<string> = signal('');

  private LanguageService = inject(LanguageService);
  private ordersService = inject(BackendOrderService);
  private menuItemService = inject(MenuItemsServiceService);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute
  order!: CombinedModelOrderResponse;
  perservedOrder!: CombinedModelOrderResponse;
  orderId?: number | null;
  orderTableNumber?: number | null;
  orderTime?: Date | null;
  isTakeAway = false;

  menuItems: MenuItem[] = [];

  extractedDrinkID: number | undefined = 0;
  extractedFoodID: number | undefined = 0;

  private router = inject(Router);
  language?: string;
  private notificationService = inject(NotificationService);
  @Output() orderSaved = new EventEmitter<void>(); // Emit event when an order is saved

  ngOnInit(): void {
    this.language = this.LanguageService.getLanguage();
    console.log();

    // Subscribe to language changes
    this.LanguageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      if (this.order && this.perservedOrder && this.menuItems) {
        this.extractIds();
      }
    });

    this.updateTitles();

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const tableNumber = params.get('tableNumber');
      this.orderTableNumber = Number(tableNumber);
      // ... other param handling code ...

      // First get menu items
      this.menuItemService.getAllMenuItemsUnPaged().subscribe({
        next: (items) => {
          this.menuItems = items;

          // Then get order details if we have a valid ID
          if (idParam && !isNaN(Number(idParam))) {
            this.orderId = Number(idParam);
            this.ordersService.getOrder(this.orderId).subscribe({
              next: (response) => {
                this.order = response;
                this.orderTime = this.order.orderdAt;
                
                this.perservedOrder = JSON.parse(JSON.stringify(this.order));
                console.log(response);
                // Now that we have all required data, call extractIds
                this.extractIds();
              },
              error: (err) => {
                this.ErrorMessage();
                //console.error('Error fetching order:', err);
              },
            });
          }
        },
        error: (err) => {
          //console.error('Error fetching menu items:', err);
        },
      });
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
    this.PrintOrder = this.LanguageService.PrintOrder;

    this.language = this.LanguageService.getLanguage();

    this.categoryName = this.LanguageService.categoryName;
    //console.log('the language is', this.language);
  }

  onOrderSaved() {
    this.ordersService.updateOrderStatus(this.orderId!).subscribe({
      next: (response) => {
        //console.log('status updated sucessfully');
        this.showSuccessMessage();
        this.orderSaved.emit(); // Notify parent component
      },
      error: (err) => {
        this.showErrorMessage();
      },
    });
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage('Order Saved', 'success');
  }

  showErrorMessage() {
    this.notificationService.showMessage('Failed To Save Order', 'danger');
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  onPrintOrder() {
    this.printOrder();
  }

  private isDataReady(): boolean {
    return !!(
      this.perservedOrder?.menuItems &&
      this.order?.menuItems &&
      this.menuItems &&
      this.menuItems.length > 0
    );
  }
  extractIds() {
    /*     console.log('extractIds called with:', {
      hasPreservedOrder: !!this.perservedOrder?.menuItems,
      hasOrder: !!this.order?.menuItems,
      hasMenuItems: !!this.menuItems,
      menuItemsCount: this.menuItems?.length,
      language: this.language
    }); */
    if (!this.isDataReady()) {
      //console.log('Data not ready for extractIds');
      return;
    }
    this.updateTitles();

    if (
      !this.perservedOrder?.menuItems ||
      !this.order?.menuItems ||
      !this.menuItems
    )
      return;

    this.order.menuItems.forEach((item, index) => {
      // Find the original note from the preserved order using both itemId and index
      const preservedOrderItem = this.perservedOrder.menuItems.find(
        (order, orderIndex) =>
          order.itemId === item.itemId && orderIndex === index
      );

      if (!preservedOrderItem) return;

      const originalNote = preservedOrderItem.note;

      // Create unique regex patterns for each item using index
      const drinkPattern = new RegExp(`drink:(\\d+)`, 'g');
      const foodPattern = new RegExp(`food:(\\d+)`, 'g');

      let updatedNote = originalNote;
      let match;

      // Handle drink matches
      while ((match = drinkPattern.exec(originalNote)) !== null) {
        const drinkId = parseInt(match[1], 10);
        const menuItem = this.menuItems.find((item) => item.id === drinkId);

        if (menuItem) {
          let drinkLabel = 'drink:';
          let drinkName = menuItem.nameEn; // default to English

          switch (this.language?.toLowerCase()) {
            case 'tr':
              drinkLabel = 'içecek:';
              drinkName = menuItem.nameTr;
              break;
            case 'ar':
              drinkLabel = 'مشروب:';
              drinkName = menuItem.nameAr;
              break;
            case 'en':
              drinkName = menuItem.nameEn;
              break;
          }

          // Replace only this specific occurrence
          updatedNote = updatedNote.replace(
            match[0],
            `${drinkLabel} ${drinkName}`
          );
        }
      }

      // Handle food matches
      const foodPattern2 = new RegExp(`food:(\\d+)`, 'g');
      while ((match = foodPattern2.exec(originalNote)) !== null) {
        const foodId = parseInt(match[1], 10);
        const menuItem = this.menuItems.find((item) => item.id === foodId);

        if (menuItem) {
          let foodLabel = 'food:';
          let foodName = menuItem.nameEn; // default to English

          switch (this.language?.toLowerCase()) {
            case 'tr':
              foodLabel = 'seçim:';
              foodName = menuItem.nameTr;
              break;
            case 'ar':
              foodLabel = 'الاختيار:';
              foodName = menuItem.nameAr;
              break;
            case 'en':
              foodName = menuItem.nameEn;
              break;
          }

          // Replace only this specific occurrence
          updatedNote = updatedNote.replace(
            match[0],
            `${foodLabel} ${foodName}`
          );
        }
      }

      item.note = updatedNote;
    });
  }

  // Function to handle printing
  printOrder() {
    const printContent = `
      <html>
        <head>
          <style>
            /* Add any styles you want for the printed content */
            .print-container {
              font-family: Arial, sans-serif;
              height: fit-content;
            }
            .brand{
            font-size: 1.2rem;
            font-weight: 800;
            text-align: center;
            }
            .total{
            display: flex;
            gap: 2rem;
            align-items: center;
            font-size: .75rem;
            margin-top: 2rem;
            font-weight: 800;
            }
            .tabledetails{
            font-size: 1rem;
            font-weight: 900;
            }

            .tabledetails2{
            font-size: 1.35rem;
            font-weight: 700;
            }

            .rowContainer{
              display: flex;
              justify-content: space-between;

            }
            .namequantity{
              display: flex;
              gap: 1rem;
            }
            .name{
              font-weight: 800;
              font-size: .75rem;

            }

            .price{
              font-weight: 800;
              font-size: .75rem;
            }

            .line{
            height: 3px;
            }

            body, html{
            height: fit-content;
            }

          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="page_layout">
              <div class="page_layout__container">
              <div class="brand"> Hungry Birds </div>
                <div class="tabledetails">
                ${
                  this.isTakeAway
                    ? 'Take Away'
                    : `${this.tableNumber()}: #${this.orderTableNumber}`
                }
              </div>
                <div class="page_layout__container__body">
                  <div class="page_layout__container__body__CategoryName">
                    <div class="tabledetails">
                      ${this.OrderNumber()}: ${this.orderId}
                    </div>
                  </div>
                  <div class="page_layout__container__body__container">
                    <div class="tabledetails2">
                      ${this.OrderDetails()}:
                    </div>
                    <hr class="line">
                      ${this.order?.menuItems
                        .map(
                          (item) => `
                          <div>
                           <div class="name">
                              ${
                                this.language === 'Ar'
                                  ? item.categoryNameAr
                                  : this.language === 'En'
                                  ? item.categoryNameEn
                                  : item.categoryNameTr
                              }
                              </div>
                            <div class="rowContainer">
                             
                            <div class="namequantity">
                              <div class="name">${item.quantity}</div>
                              <div class="name">
                              ${
                                this.language === 'Ar'
                                  ? item.nameAr
                                  : this.language === 'En'
                                  ? item.nameEn
                                  : item.nameTr
                              }
                              </div>
                            </div>

                              <div class="price">
                                ${item.price * item.quantity}
                              </div>

                            </div>
                            <div class="name">${item.note ?? ''}</div>
                          </div>

                          <hr class="line">
                      `
                        )
                        .join('')}
                    </table>
                    <div class="page_layout__container__body__container__summary">
                      <div class="page_layout__container__body__container__summary__container">
                        <div class="total">
                          ${this.Total()}
                          ${this.order?.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';

    document.body.appendChild(iframe);

    // Write the content to the iframe and print
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(printContent);
      doc.close();

      // Wait for the content to load before printing
      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // Remove the iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };
    }
  }
}

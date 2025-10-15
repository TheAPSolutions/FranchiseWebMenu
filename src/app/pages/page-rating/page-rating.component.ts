import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { BackendOrderService } from '../../Services/backend-order.service';
import { CombinedModelOrderResponse } from '../../models/ordersModel/combinedOrderRespinse.model';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItemOrder } from '../../models/ordersModel/MenuItem.model';

@Component({
  selector: 'app-page-rating',
  templateUrl: './page-rating.component.html',
  styleUrl: './page-rating.component.scss',
})
export class PageRatingComponent implements OnInit {
  private orderService = inject(BackendOrderService);
  delayedInputValue: number | null = null; // To store the delayed value after 5 seconds
  private typingTimeout: any; // Store the timeout to clear it if needed
  inputValue: number | null = null; // The input value
  order?: CombinedModelOrderResponse;
  uniqueMenuItems?: MenuItemOrder[];
  private notificationService = inject(NotificationService);
  OrderNumber: WritableSignal<string> = signal('');
  cannotRate: WritableSignal<string> = signal('');
  private LanguageService = inject(LanguageService);
  private menuService = inject(MenuItemsServiceService);
  language?: string;
  itemRatings: Map<number, number> = new Map();
  hoveredStars: Map<number, number> = new Map(); // Store hover state per item
  canRate = false;
  
  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');
  //originalRating = 5;

  ngOnInit(): void {
    this.LanguageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.updateTitles();
  }

  @Input() rating: number = 0; // The current rating passed from the parent
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>(); // Emit the rating change to the parent
  @Output() sucessRating: EventEmitter<void> = new EventEmitter<void>();

  stars: boolean[] = [false, false, false, false, false]; // Store the filled state for each star

  onInputChange(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.inputValue) {
        this.orderService.getOrder(this.inputValue!).subscribe({
          next: (response) => {
            this.order = response;
            if (!this.order.isRated) {
              this.canRate = true;
            }
            //console.log('order by id', this.order);
  
            // Filter to get unique menu items based on id
            const uniqueMenuItems = this.getUniqueMenuItems(response.menuItems);
            //console.log('Unique Menu Items:', uniqueMenuItems);
  
            // You can store the unique items or update a variable here
            this.uniqueMenuItems = uniqueMenuItems;
            this.sucessRating.emit();
          },
          error: (err) => {
            this.showErrorMessage();
          },
        });
      }
    }
  }
  
  getUniqueMenuItems(menuItems: any[]): any[] {
    return menuItems.filter((item, index, self) =>
      self.findIndex(t => t.itemId === item.itemId) === index
    );
  }

  rate(itemId: number, stars: number) {
    // Store the rating for the specific item
    this.itemRatings.set(itemId, stars);
    //console.log(`Rating for item ${itemId}: ${stars}`);
    //this.ratingChanged.emit({ itemId, rating: value });
  }

  hover(itemId: number, value: number) {
    this.hoveredStars.set(itemId, value); // Set the hover state for the specific item
  }

  clearHover(itemId: number) {
    this.hoveredStars.set(itemId, 0); // Clear the hover state for the specific item
  }

  showErrorMessage() {
    if (this.language == 'En') {
      this.notificationService.showMessage('Failed To Find Order', 'danger');
    } else if (this.language == 'Tr') {
      this.notificationService.showMessage(
        'Sipariş numarası sistemde bulunmamaktadır',
        'danger'
      );
    } else if (this.language == 'Ar') {
      this.notificationService.showMessage(
        'لم يتم إيجاد طلب بهذا الرقم',
        'danger'
      );
    }
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.OrderNumber = this.LanguageService.OrderNumber;
    this.cannotRate = this.LanguageService.CannotRate;
    this.NavLeft = this.LanguageService.Menu;
    this.NavRight = this.LanguageService.Cart;
    this.language = this.LanguageService.getLanguage();
    //console.log('the language is', this.language);
  }

  updateRating() {
    this.itemRatings.forEach((rating, itemId) => {
      this.menuService.getMenuItem(itemId).subscribe({
        next: (response) => {
          let adjustedRating;
          const originalRating = response.ratingValue; // Retrieve original rating from the service

          //console.log(`Item ID: ${itemId}, Original Rating: ${originalRating}`);

          // Adjust rating based on the provided rating in itemRatings, not originalRating directly
          switch (rating) {
            case 1:
              adjustedRating = originalRating - 0.1;
              break;
            case 2:
              adjustedRating = originalRating - 0.05;
              break;
            case 3:
              adjustedRating = originalRating - 0.03;
              break;
            case 4:
              adjustedRating = originalRating + 0.05;
              break;
            case 5:
              adjustedRating = originalRating + 0.1;
              break;
            default:
              adjustedRating = originalRating; // If no match, keep original rating
          }

          // Ensure the adjusted rating stays within the range of 0 to 5
          adjustedRating = Math.min(Math.max(adjustedRating, 0), 5);

          this.menuService.updateRating(itemId, adjustedRating).subscribe({
            next: (response) => {
              //console.log('upadate rating for', itemId);
              this.orderService
                .updateOrderRatingStatus(this.inputValue!)
                .subscribe({
                  next: (response) => {
                    //console.log('is Rated upadated');
                  },
                  error: (err) => {
                    //console.log('not updated is Rated');
                  },
                });
            },
            error: (err) => {
              //console.log('Error with updating');
            },
          });

          //console.log(`Item ID: ${itemId}, Adjusted Rating: ${adjustedRating}`);

          // Optionally, update the map with the adjusted rating
          this.itemRatings.set(itemId, adjustedRating);
        },
        error: (err) => {
          //console.error(`Failed to get menu item for ID ${itemId}`, err);
        },
      });
    });
  }
}

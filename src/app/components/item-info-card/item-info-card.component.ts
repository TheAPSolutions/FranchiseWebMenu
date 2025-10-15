import {
  Component,
  input,
  Output,
  signal,
  EventEmitter,
  inject,
  OnInit,
  WritableSignal,
  ViewChild,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { SingleMenuItem } from '../../models/Customer Order model/single-menu-item.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { OrderCounterComponent } from '../order-counter/order-counter.component';

@Component({
  selector: 'app-item-info-card',
  templateUrl: './item-info-card.component.html',
  styleUrl: './item-info-card.component.scss',
})
export class ItemInfoCardComponent implements OnInit {
  id = input.required<number>();
  menuItem!: SingleMenuItem;
  //Language service
  private languageService = inject(LanguageService);

  menuService = inject(MenuItemsServiceService);
  language = this.languageService.getLanguage();
  Description: WritableSignal<string> = signal('');
  private orderService = inject(OrderService);

  title!: string;
  desc!: string;
  IndirimPrice!: number;
  price!: number;
  rating!: number;
  takeawayprice!: number;
  input_order_type = 'dine in';

  isLoading: boolean = true; // Loading state

  @ViewChild('counter') counterComponent!: OrderCounterComponent;


  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      this.setMenuItems();

    });
    this.Description = this.languageService.Description;
    this.menuService.getMenuItem(this.id()).subscribe({
      next: (response) => {
        this.menuItem = response;
        this.rating = this.menuItem.ratingValue;
        this.setMenuItems();
        this.isLoading = false;

      },
      error: (err) => {
        //console.log("Error fetching item");
      },
    });
    // Initialize titles based on the default language
    this.updateTitles();
    if(this.orderService.getIsTakeaway()){
      this.input_order_type = 'take away';
    }else{
      this.input_order_type = 'dine in';
    }
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.language = this.languageService.getLanguage();
  }

  @Output() orderSuccess = new EventEmitter<void>();
  @Output() orderDelete = new EventEmitter<void>();
  @Output() warning = new EventEmitter<void>();
  @Output() openOrderOptionsOverlay = new EventEmitter<[boolean, number, OrderModel]>();

  // This method returns the correct background image URL format
  getBackgroundImage(imageUrl: String): String {
    return `url(${imageUrl})`;
  }

  handleOrderSuccess() {
    this.orderSuccess.emit(); // Pass the event up to the parent
  }
  handleOrderDelete() {
    this.orderDelete.emit(); // Delete the item from the order
  }
  handleWarning() {
    this.warning.emit(); // Delete the item from the order
  }

  setMenuItems(){

    switch (this.languageService.getLanguage()) {
      case 'En':
        this.desc = this.menuItem.descriptionEn;
        this.takeawayprice = this.menuItem.priceEn;
        //console.log('desc' , this.menuItem.descriptionEn);
        if (this.menuItem.discountedPriceEn == 0) {
          this.IndirimPrice = this.menuItem.priceEn;
        } else {
          this.IndirimPrice = this.menuItem.discountedPriceEn;
        }
        this.title = this.menuItem.nameEn;
        this.price = this.menuItem.priceEn;
        break;
      case 'Tr':
        this.desc = this.menuItem.descriptionTr;
        this.takeawayprice = this.menuItem.priceTr;
        if (this.menuItem.discountedPriceTr == 0) {
          this.IndirimPrice = this.menuItem.priceTr;
        } else {
          this.IndirimPrice = this.menuItem.discountedPriceTr;
        }
        this.title = this.menuItem.nameTr;
        this.price = this.menuItem.priceTr;
        break;
      case 'Ar':
        this.desc = this.menuItem.descriptionAr;
        this.takeawayprice = this.menuItem.priceAr;
        if (this.menuItem.discountedPriceAr == 0) {
          this.IndirimPrice = this.menuItem.priceAr;
        } else {
          this.IndirimPrice = this.menuItem.discountedPriceAr;
        }
        this.title = this.menuItem.nameAr;
        this.price = this.menuItem.priceAr;
    }
  }
    handleOpenOverlayClick(event: [boolean, OrderModel]) {
      //console.log('open Overlay');
      this.openOrderOptionsOverlay.emit([true, this.id(), event[1]]);
    }
}

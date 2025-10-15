import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  inject,
  input,
} from '@angular/core';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { OrderService } from '../../Services/order.service';
import { LanguageService } from '../../Services/language.service';
import { SingleMenuItem } from '../../models/Customer Order model/single-menu-item.model';
import { OrderModel } from '../../models/Customer Order model/order-model.model';

@Component({
  selector: 'app-order-page-food-card',
  templateUrl: './order-page-food-card.component.html',
  styleUrls: ['./order-page-food-card.component.scss'],
})
export class OrderPageFoodCardComponent implements OnInit {
  itemName: string = '';
  itemPrice: number = 0;
  imageUrl: string = '';

  takeawayprice: number = 0;

  singleItem!: SingleMenuItem
  @Output() orderSuccess = new EventEmitter<void>();
  @Output() orderDelete = new EventEmitter<void>();
  @Output() openOrderOptionsOverlay = new EventEmitter<[boolean, number,OrderModel]>();

  itemService = inject(MenuItemsServiceService);
  orderService = inject(OrderService);
  languageService = inject(LanguageService);

  order = input.required<OrderModel>();

  isStudent = input.required<boolean>();
  isTakeaway = input.required<boolean>();

  language = 'Tr';


  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles(this.languageService.getLanguage());
    });

    //console.log('the language is ', language);
    this.itemService.getMenuItem(this.order().itemId).subscribe({
      next: (response) => {
        this.singleItem = response;

        if(response.categoryName === "Students Menu"){
          this.orderService.setIsRequiredStudent(true);
        }
        //console.log(this.singleItem);
        this.updateTitles(this.languageService.getLanguage());
        this.imageUrl = response.imageUrl;
        // Now, update the total price after item data is received
        const amount = this.orderService.getAmount(this.order().itemId);
      },
    });
  }
  handleOpenOrderOptionsOverLay(value: [boolean, OrderModel]){
    this.openOrderOptionsOverlay.emit([value[0], this.order().itemId,this.order()]);
  }
  handleOrderSuccess() {
    this.orderSuccess.emit(); // Pass the event up to the parent
  }

  handleOrderDelete() {
    this.orderDelete.emit(); // Delete the item from the order
  }

  getBackgroundImage(imageUrl: String){
    return `url(${imageUrl})`;
  }

  updateTitles(lan:string){
    this.language = this.languageService.getLanguage();

    switch(lan){
      case 'En':
        this.itemName = this.singleItem.nameEn;
        this.itemPrice = this.singleItem.discountedPriceEn > 0 ? this.singleItem.discountedPriceEn : this.singleItem.priceEn;
        this.takeawayprice = this.singleItem.priceEn;
        break;
      case "Ar":
        this.itemName = this.singleItem.nameAr;
        this.itemPrice = this.singleItem.discountedPriceAr > 0 ? this.singleItem.discountedPriceAr : this.singleItem.priceAr;
        this.takeawayprice = this.singleItem.priceAr;
        break;
      case "Tr":
        this.itemName = this.singleItem.nameTr;
        this.itemPrice = this.singleItem.discountedPriceTr > 0 ? this.singleItem.discountedPriceTr : this.singleItem.priceTr;
        this.takeawayprice = this.singleItem.priceTr;
        break;
    }

  }
}

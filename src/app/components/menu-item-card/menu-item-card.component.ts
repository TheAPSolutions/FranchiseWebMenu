import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { OrderCounterComponent } from '../order-counter/order-counter.component';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss',
})
export class MenuItemCardComponent implements OnInit{
  input_item_image = input.required<String>();
  input_item_title = input.required<String>();
  input_item_rating = input.required<number>();
  input_item_old_price = input.required<number>();
  input_item_new_price = input.required<number>();
  input_item_description = input.required<string>();
  input_item_studentPrice = input.required<number>();
  input_hasOptions = input.required<boolean>();
  description = signal<string>('');
  @Output() orderSuccess = new EventEmitter<void>();
  @Output() orderDelete = new EventEmitter<void>();
  @Output() warning = new EventEmitter<void>();
  @Output() openOrderOptionsOverlay = new EventEmitter<[boolean, number, OrderModel]>();
  input_order_type = 'dine in';

  id = input.required<number>();
  private orderService = inject(OrderService);

  @ViewChild('counter') counterComponent! : OrderCounterComponent; 

  isImageEnlarged = false;

  //Language Service
  
  private languageService = inject(LanguageService);

  language = this.languageService.getLanguage();

  Description: WritableSignal<string> = signal('');
  LearnMore: WritableSignal<string> = signal('');


  private updateTitles() {
    // Update titles based on the current language in the service
    this.Description = this.languageService.Description;
    this.LearnMore = this.languageService.LearnMore;
    this.language = this.languageService.getLanguage();

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

  ngOnInit() {
    if(this.input_item_new_price() == 0){
      this.input_item_new_price = this.input_item_old_price;
    };
    this.trimInput();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    // Initialize titles based on the default language
    this.updateTitles();
    //console.log(this.language);
    if(this.orderService.getIsTakeaway()){
      this.input_order_type = 'take away';
    } else{
      this.input_order_type = 'dine in';
    }
    //console.log("Received ID" + this.id());
    
  }

  trimInput(): void {
    const inputDescription = this.input_item_description();

    // Set the current value of description to input_item_description
    this.description.set(inputDescription);

    // Check the length and trim if necessary
    if (this.description().length > 55) {
      // Use () to access the signal value
      this.description.set(this.description().substring(0, 55) + '....'); // Trim to 30 characters
    }
  }

  // This method returns the correct background image URL format
  getBackgroundImage(imageUrl: String): String {
    return `url(${imageUrl})`;
  }

  logId(){
    return "sending this id" + this.id();
  }

  onCardImageClick() {
    this.isImageEnlarged = !this.isImageEnlarged; // Toggle the state
    //console.log('image clicked');
  }
  handleOpenOverlayClick(event: [boolean, OrderModel]) {
    //console.log('open Overlay');
    this.openOrderOptionsOverlay.emit([true, this.id(), event[1]]);
  }
}

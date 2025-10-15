import { Component, EventEmitter, inject, input, OnInit, Output, output, signal,   WritableSignal, } from '@angular/core';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { menuItemOptionsService } from '../../Services/menuItemOptions.service';
import { CombinedOptionsDTO } from '../../models/MenuItemOptionsDTO/CombinedOptionsDTO.model';
import { DrinksDTO } from '../../models/MenuItemOptionsDTO/DrinksDTO.model';
import { ItemsDTO } from '../../models/MenuItemOptionsDTO/ItemsDTO.model';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { LanguageService } from '../../Services/language.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-order-options-overlay',
  templateUrl: './order-options-overlay.component.html',
  styleUrl: './order-options-overlay.component.scss'
})
export class OrderOptionsOverlayComponent implements OnInit{

  selectedDrink: {name: string; id: number} = {name:"", id: 0};
  selectedFood: {name: string; id: number} = {name:"", id: 0};
  drinks: MenuItem[] = [];
  menuItemsService = inject(MenuItemsServiceService);
  parentMenuItemId = input.required<number>();
  @Output() isVisible = new EventEmitter<[boolean,number, OrderModel]>();
  @Output() Closed = new EventEmitter<[boolean,number, OrderModel]>();
  @Output() orderSuccess = new EventEmitter<void>();
  @Output() orderDelete = new EventEmitter<void>();
  hasDrinks: boolean = false;
  hasFood: boolean = false;
  menuItemOptionsService = inject(menuItemOptionsService);
  options: CombinedOptionsDTO = { drinkOptions: [], foodOptions: [], parentId:0, optionsId: 0 }; // Initialize directly
  order= input.required<OrderModel>();
  orderService = inject(OrderService);


  selectOptionsTitle : WritableSignal<string> = signal('');
  DrinksTitle : WritableSignal<string> = signal('');
  FoodTitle: WritableSignal<string> = signal('');
  saveChoiceTitle : WritableSignal<string> = signal('');
  notificationservice = inject(NotificationService);

    
  private languageService = inject(LanguageService);
  language = this.languageService.getLanguage();

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.menuItemOptionsService.getMenuItemOptionsByID(this.parentMenuItemId()).subscribe({
      next: (response) => {
        this.options = response;
        if (this.options.drinkOptions.length > 0) {
          this.hasDrinks = true;
        }if(this.options.foodOptions.length > 0){
          this.hasFood = true;
        }

        //console.log("This item options: ", this.options);
      },
      error: (error) => {
        //console.error("An error occurred:", error);
      }
    });
  }

  onDrinksClicked(drink:DrinksDTO){
    this.selectedDrink.name = drink.nameEn;
    this.selectedDrink.id = drink.id;
  }
  onFoodClicked(item:ItemsDTO){
    this.selectedFood.name = item.nameEn;
    this.selectedFood.id = item.id;  }

  onClose() {
    this.Closed.emit([false, this.parentMenuItemId(), this.order()]);
  }

  onSave() {
    if((this.hasDrinks && this.selectedDrink.id === 0) && (this.selectedFood.id === 0 && this.hasFood)){
      this.showBothWarning();
      return;
    }else if(this.hasDrinks && this.selectedDrink.id === 0){
      this.showDrinksWarning();
      return;
    }else if(this.hasFood && this.selectedFood.id === 0){
      this.showFoodWarning();
      return;
    }


    this.order().drinkOption = this.selectedDrink.id;
    this.order().foodOption = this.selectedFood.id;
    this.orderService.addOrder(this.parentMenuItemId(), this.order().price, this.order().studentPrice,this.order().takeawayprice,this.order().hasOptions, this.selectedDrink.id, this.selectedFood.id);
    this.isVisible.emit([false, this.parentMenuItemId(), this.order()]);
    this.orderSuccess.emit();
    //console.log("drink:", this.selectedDrink.id, this.selectedFood.id);
  }

  updateTitles(){
    this.language = this.languageService.getLanguage();
    this.DrinksTitle = this.languageService.drinks;
    this.selectOptionsTitle = this.languageService.selectYourOptions;
    this.FoodTitle = this.languageService.sandwich;
    this.saveChoiceTitle = this.languageService.saveChoices;
  }

  showDrinksWarning() {
    if (this.language == 'En') {
      this.notificationservice.showMessage(
        'Please select a drink',
        'warning'
      );
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage('Lütfen bir içecek seçin', 'warning');
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage(
        'الرجاء اختيار المشروب',
        'warning'
      );
    }
  }
  showFoodWarning() {
    if (this.language == 'En') {
      this.notificationservice.showMessage(
        'Please select a food option',
        'warning'
      );
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage('lütfen yemek seçeneğiniz seçin', 'warning');
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage(
        'الرجاء تحديد خيار الطعام',
        'warning'
      );
    }
  }

  showBothWarning(){
    if (this.language == 'En') {
      this.notificationservice.showMessage(
        'Please select a Drink and  food option',
        'warning'
      );
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage('lütfen yemek ve içecek seçeneğiniz seçin', 'warning');
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage(
        'الرجاء تحديد خيار الطعام و المشروب',
        'warning'
      );
    }
  }

}

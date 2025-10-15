import { Component, EventEmitter, inject, Input, input, OnInit, Output, signal } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { menuItemOptionsService } from '../../Services/menuItemOptions.service';
import { CombinedOptionsDTO } from '../../models/MenuItemOptionsDTO/CombinedOptionsDTO.model';

@Component({
  selector: 'app-order-counter',
  templateUrl: './order-counter.component.html',
  styleUrl: './order-counter.component.scss'
})
export class OrderCounterComponent implements OnInit{
  UserOrder = inject(OrderService);

  customerOrders: OrderModel[] = [];

  input_color = input.required<String>();

  studentPrice = input.required<number>();
  @Output() orderSuccess = new EventEmitter<void>();
  @Output() orderDelete = new EventEmitter<void>();
  @Output() warning = new EventEmitter<void>();
  @Output() hasOptions = new EventEmitter<void>();
  @Output() openOverlay = new EventEmitter<[boolean, OrderModel]>(false);
  @Input() orderFromOrdersPage?: OrderModel ;

  menuItemOptions = inject(menuItemOptionsService);
  options: CombinedOptionsDTO = { drinkOptions: [], foodOptions: [], parentId:0, optionsId: 0 }; // Initialize directly
  order:OrderModel = {
    itemId: 0,
    price: 0,
    takeawayprice: 0,
    hasOptions: false,
    drinkOption: 0,
    foodOption: 0,
    studentPrice: 0,
    amount: 0
  };

  id = input.required<number>();
  price = input.required<number>();

  takeawayprice = input.required<number>();
  ishasOptions = input.required<boolean>();

  number = 0;
  ngOnInit(): void {
    // Ensure `id` is defined before using it
    this.number = this.UserOrder.getAmount(this.id());

    this.menuItemOptions.getMenuItemOptionsByID(this.id()).subscribe({
      next: (result) => {
        this.options = result;
      }
    }); 

    this.UserOrder.orders$.subscribe((result) => {
      this.customerOrders = result;
    });

  }
  MinusClicked(){
    if(this.number > 0 && !this.ishasOptions()){
      this.number--;
      this.UserOrder.decreaseAmount(this.id());
      this.orderDelete.emit();  
    }else if(this.number > 0 && this.ishasOptions()){
      if(this.orderFromOrdersPage){
        this.UserOrder.removeOrder(this.orderFromOrdersPage);
        this.orderDelete.emit(); 
        return;
      }
      const numoforders = this.customerOrders.filter(m => m.itemId == this.id());
      if(numoforders.length === 1){
        this.number--;
        this.UserOrder.decreaseAmount(this.id());
        this.orderDelete.emit(); 
      }else if(numoforders.length > 1){
        this.warning.emit();
      }
    }  
  }

  MinusClickedFromClose(){
    if(this.number > 0){
      this.number--;
    }
  }
  PlusClicked(){
    if(this.ishasOptions() && (this.options.drinkOptions.length > 0 || this.options.foodOptions.length > 0)){
      this.order.drinkOption = 0;
      this.order.foodOption = 0;
      this.order.hasOptions = true;
      this.order.itemId = this.id();
      this.order.price = this.price();
      this.order.studentPrice = this.studentPrice();
      this.order.takeawayprice = this.takeawayprice();
      this.openOverlay.emit([true, this.order]);
      this.number <= 0 ? this.number++ : this.number;
    }else {
      this.number++;
      this.UserOrder.addOrder(this.id(), this.price(), this.studentPrice(),this.takeawayprice(), false,0,0);
      this.orderSuccess.emit(); 
    }

    
  }
}

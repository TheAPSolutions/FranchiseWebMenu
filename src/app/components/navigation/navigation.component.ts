import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  @Input({required: true}) LeftImage!: string;
  @Input({required: true}) LeftTitle!: string ;
  @Input({required: true}) LeftRoute!: string ;

  @Input({required: true}) RightImage!: string;
  @Input({required: true}) RightText!: string;
  @Input({required: true}) RightRoute!: string;

  @Input({required: true}) MiddleImage!: string;
  @Input({required: true}) MiddleRoute!: string;
  
  orderService = inject(OrderService);
  count: number = 0;
  isRotating: boolean = false;

  ngOnInit(): void {
    // Retrieve previous count from sessionStorage, defaulting to 0 if it doesn't exist
    const storedCount = Number(sessionStorage.getItem('orderCount') || '0');
    this.count = storedCount;

    this.orderService.orders$.subscribe((orders) => {
      let newCount:number = 0;

      orders.forEach((order) => {
        if(order.amount > 0){
          newCount += order.amount;
        }
      });

      // Only trigger rotation if the new count is greater than the stored count
      if (newCount > this.count) {
        this.isRotating = true;

        // Reset rotation animation after it completes
        setTimeout(() => {
          this.isRotating = false;
        }, 500); // Match this duration with the CSS animation duration
      }
      // Update the count and save it to sessionStorage
      this.count = newCount;
      sessionStorage.setItem('orderCount', this.count.toString());
    });
  }

}

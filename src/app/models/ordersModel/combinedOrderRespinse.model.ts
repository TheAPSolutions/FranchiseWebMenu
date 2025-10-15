import { MenuItemOrder } from './MenuItem.model';
import { SingleOrderDetails } from './singleOrderDetails.model';

export interface CombinedModelOrderResponse {
  orderId: number;
  menuItems: MenuItemOrder[];
  countOfItems: number;
  orderdAt: Date;
  totalPrice: number;
  isRated: number;
  isStudent: number;
}

import { MenuItemOrder } from './MenuItem.model';

export interface SingleOrderDetails {
  orderId: number;
  menuItems: MenuItemOrder[];
  countOfItems: number;
  orderdAt: Date;
  totalPrice: number;
}

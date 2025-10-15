import { AddOrderItemModel } from "../Customer Order model/add-orderitem-request.model";

export interface Orders
{
    id: number;
    tableNumber: number;
    status: boolean;
    createdAt: Date;
    customerOrders: AddOrderItemModel[];
    totalPrice: number;
    phoneNumber: string;
}


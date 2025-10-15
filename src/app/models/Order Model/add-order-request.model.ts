import { AddOrderItemModel } from "../Customer Order model/add-orderitem-request.model";

export interface AddOrderModel{
    TableNumber:number;
    StudentNumber:string | "";
    StudentEmail:string | "";
    branchId:number;
    totalPrice:number;
    isStudent:boolean;
}

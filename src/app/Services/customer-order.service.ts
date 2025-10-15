import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrderItemModel } from '../models/Customer Order model/add-orderitem-request.model';
import { Observable, tap } from 'rxjs';
import { AddOrderModel } from '../models/Order Model/add-order-request.model';
import { environment } from '../environments/environment';

// Define CombinedModel interface outside the class
interface CombinedModel {
  OrderItems: AddOrderItemModel[];
  Order: AddOrderModel;
  isCash: boolean;
  phoneNumber: string;
  acceptCampains: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/OrderItems';
  //apiUrl = 'https://localhost:7142/api/OrderItems';

  constructor(private http: HttpClient) { }


  // Updated sendCustomerOrder method
  sendCustomerOrder(model: AddOrderItemModel[], model2: AddOrderModel, isCash: boolean, phoneNumber:string,acceptCampaigns: boolean): Observable<any> {
    const combinedModel: CombinedModel = {
      OrderItems: model,
      Order: model2,
      isCash: isCash,
      phoneNumber: phoneNumber,
      acceptCampains: acceptCampaigns
    };
    return this.http.post<CombinedModel>(this.apiUrl + '/OrderItems', combinedModel);
  }
  
}

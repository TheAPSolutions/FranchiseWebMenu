import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrderModel } from '../models/Order Model/add-order-request.model';
import { Observable } from 'rxjs';
import { Orders } from '../models/ordersModel/Orders.model';
import { AddOrderItemModel } from '../models/Customer Order model/add-orderitem-request.model';
import { SingleOrderDetails } from '../models/ordersModel/singleOrderDetails.model';
import { MenuItemOrder } from '../models/ordersModel/MenuItem.model';
import { CombinedModelOrderResponse } from '../models/ordersModel/combinedOrderRespinse.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendOrderService {
  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/Order';
  //apiUrl = 'https://localhost:7142/api/Order';

  constructor(private http: HttpClient) {}

  sendOrder(order: AddOrderModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/Order?addAuth=true`, order);
  }

  getOrder(id: number): Observable<CombinedModelOrderResponse> {
    return this.http.get<CombinedModelOrderResponse>(
      `${this.apiUrl}/Order/${id}`
    );
  }

  updateOrderRatingStatus(id: number): Observable<CombinedModelOrderResponse> {
    return this.http.put<CombinedModelOrderResponse>(
      `${this.apiUrl}/Order/Rating?id=${id}`,
      true
    );
  }

  getAllOrders(
    BranchId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Order/all?BranchId=${BranchId}&pageNumber=${pageNumber}&pageSize=${pageSize}&?addAuth=true`
    );
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Order`);
  }

  getUnSavedOrders(
    BranchId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Order/unsaved?BranchId=${BranchId}&pageNumber=${pageNumber}&pageSize=${pageSize}&addAuth=true`
    );
  }
  getUnSavedOrdersNotReady(
    BranchId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Order/notready?BranchId=${BranchId}&pageNumber=${pageNumber}&pageSize=${pageSize}&addAuth=true`
    );
  }

  getTodaysOrders(
    BranchId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Order/today?BranchId=${BranchId}&pageNumber=${pageNumber}&pageSize=${pageSize}&?addAuth=true`
    );
  }

  updateOrderStatus(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Order/${id}?addAuth=true`, null);
  }
  updateOrderIsReady(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Order/updateIsReady/${id}?addAuth=true`, null);
  }

  searchOrderByTableNumber(id: number, branchid: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Order/search-by-table/${id}?branchid=${branchid}`
    );
  }

  getOrdersByDate(date: Date, branchid: number): Observable<any> {
    const formattedDate = this.formatDateToMMDDYYYY(date);
    //console.log('the formatted date', formattedDate);
    return this.http.get(
      `${this.apiUrl}/Order/GetOrdersByDate?date=${formattedDate}&branchid=${branchid}`
    );
  }

  formatDateToMMDDYYYY(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (01-12)
    const day = date.getDate().toString().padStart(2, '0'); // Get day (01-31)
    const year = date.getFullYear(); // Get full year (YYYY)

    return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
  }
}

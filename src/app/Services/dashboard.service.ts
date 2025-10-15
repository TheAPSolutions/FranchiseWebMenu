import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BranchOrdersResponse } from '../models/dashboard/branchOrdersResponse.model';
import { TotalOrdersResponse } from '../models/dashboard/TotalOrdersResponse.model';
import { OrderBranchResponse } from '../models/dashboard/OrderBranchResponse.model';
import { DineInTakeawayResponse } from '../models/dashboard/DineInTakeawayResponse.model';
import { DineInTakeawayBranchResponse } from '../models/dashboard/DineInTakeawayBranchResponse.model';
import { TotalSalesResponse } from '../models/dashboard/TotalSalesResponse.model';
import { TotalSalesBranchResponse } from '../models/dashboard/TotalSalesBranchResponse.model';
import { TotalSalesPaymentResponse } from '../models/dashboard/TotalSalesPaymentResponse.model';
import { TotalSalesPaymentBranchResponse } from '../models/dashboard/TotalSalesPaymentBranchResponse.model';
import { TopSoldItemsResponse } from '../models/dashboard/TopSoldItemsResponse.model';
import { OrderResponse } from '../models/dashboard/OrderResponse.model';
import { MenuItemSalesResponse } from '../models/dashboard/MenuItemSalesResponse.model';
import { MenuItemQuantityResponse } from '../models/dashboard/MenuItemQuantityResponse.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTotalNumberOfItemsPerMonth(): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}/Dashboard/total-items-per-month`)
      .pipe(catchError(this.handleError));
  }

  getTotalItemsOrderedPerBranch(): Observable<BranchOrdersResponse[]> {
    return this.http.get<BranchOrdersResponse[]>(
      `${this.apiUrl}/Dashboard/total-items-per-branch`
    );
  }

  getTotalOrdersPerMonth(): Observable<TotalOrdersResponse[]> {
    return this.http.get<TotalOrdersResponse[]>(
      `${this.apiUrl}/Dashboard/total-orders-per-month`
    );
  }

  getTotalOrdersPerBranch(): Observable<OrderBranchResponse[]> {
    return this.http.get<OrderBranchResponse[]>(
      `${this.apiUrl}/Dashboard/total-orders-per-branch`
    );
  }

  getDineInTakeawayOrders(): Observable<DineInTakeawayResponse[]> {
    return this.http.get<DineInTakeawayResponse[]>(
      `${this.apiUrl}/Dashboard/dinein-takeaway-per-month`
    );
  }

  getDineInTakeawayOrdersPerBranch(): Observable<
    DineInTakeawayBranchResponse[]
  > {
    return this.http.get<DineInTakeawayBranchResponse[]>(
      `${this.apiUrl}/Dashboard/dinein-takeaway-per-branch`
    );
  }

  getTotalSalesPerMonth(): Observable<TotalSalesResponse[]> {
    return this.http.get<TotalSalesResponse[]>(
      `${this.apiUrl}/Dashboard/total-sales-per-month`
    );
  }

  getTotalSalesPerBranchPerMonth(): Observable<TotalSalesBranchResponse[]> {
    return this.http.get<TotalSalesBranchResponse[]>(
      `${this.apiUrl}/Dashboard/total-sales-per-branch-per-month`
    );
  }

  getTotalSalesPerPaymentMethod(): Observable<TotalSalesPaymentResponse[]> {
    return this.http.get<TotalSalesPaymentResponse[]>(
      `${this.apiUrl}/Dashboard/total-sales-per-payment-method`
    );
  }

  getTotalSalesPerPaymentMethodPerBranch(): Observable<
    TotalSalesPaymentBranchResponse[]
  > {
    return this.http.get<TotalSalesPaymentBranchResponse[]>(
      `${this.apiUrl}/Dashboard/total-sales-per-payment-method-per-branch`
    );
  }

  getTopSoldItems(): Observable<TopSoldItemsResponse[]> {
    return this.http.get<TopSoldItemsResponse[]>(
      `${this.apiUrl}/Dashboard/top-5-sold-items-per-month`
    );
  }

  getFilteredOrders(
    branchId: number,
    startDate?: string,
    endDate?: string
  ): Observable<OrderResponse[]> {
    let params: any = { branchId };

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/Dashboard/orders-with-filters`,
      { params }
    );
  }

  getFilteredOrdersCard(
    branchId: number,
    startDate?: string,
    endDate?: string
  ): Observable<OrderResponse[]> {
    let params: any = { branchId };

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/Dashboard/orders-with-filters-card`,
      { params }
    );
  }

  getTotalSalesPerMenuItemPerBranch(
    menuItemId: number,
    month: number,
    year: number
  ): Observable<MenuItemSalesResponse[]> {
    return this.http.get<MenuItemSalesResponse[]>(
      `${this.apiUrl}/Dashboard/total-sales-per-menu-item-per-branch`,
      {
        params: { menuItemId, month, year },
      }
    );
  }

  getTotalQuantitySoldPerMenuItemPerBranch(
    menuItemId: number,
    month: number,
    year: number
  ): Observable<MenuItemQuantityResponse[]> {
    return this.http.get<MenuItemQuantityResponse[]>(
      `${this.apiUrl}/Dashboard/total-quantity-sold-per-menu-item-per-branch`,
      {
        params: { menuItemId, month, year },
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

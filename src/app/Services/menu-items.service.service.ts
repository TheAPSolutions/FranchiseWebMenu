import { inject, Injectable, model } from '@angular/core';
import { AddMenuItemRequest } from '../models/add-menuItem-request/add-menuItem-request.model';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { MenuItem } from '../models/add-menuItem-request/menuItem.model';
import { UpdatMenuItemRequest } from '../models/add-menuItem-request/update-menuItem-request.model';
import { UpdateItemImage } from '../models/add-menuItem-request/update-item-image.model';
import { PagedResponse } from '../models/add-menuItem-request/paged-response.model';
import { SingleMenuItem } from '../models/Customer Order model/single-menu-item.model';
import { OrderMenuItem } from '../models/add-menuItem-request/order-menuItem.model';
import { Console } from 'console';
import { environment } from '../environments/environment';
import { FranchiseService } from './franchise.service';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  private franchiseService = inject(FranchiseService);
  //apiUrl = 'https://apsolutionsapi.online/api/MenuItems';
  //apiUrl = 'https://localhost:7142/api/MenuItems';

  addMenuItem(
    item: AddMenuItemRequest,
    isSubCategory: boolean
  ): Observable<any> {
    const formData = new FormData();
    formData.append('NameAr', item.NameAr);
    formData.append('NameEn', item.NameEn);
    formData.append('NameTr', item.NameTr);
    formData.append('PriceTr', item.PriceTr.toString());
    formData.append('PriceEn', item.PriceEn.toString());
    formData.append('PriceAr', item.PriceAr.toString());
    formData.append('DiscountedPriceTr', item.DiscountedPriceTr.toString());
    formData.append('DiscountedPriceEn', item.DiscountedPriceEn.toString());
    formData.append('DiscountedPriceAr', item.DiscountedPriceAr.toString());
    formData.append('categoryId', item.categoryId.toString());
    if (item.imageUrl) {
      formData.append('imageUrl', item.imageUrl, item.imageUrl.name);
    }
    if (item.StudentPrice != null) {
      formData.append('StudentPrice', item.StudentPrice.toString());
    }
    if (item.DescriptionTr != null && item.DescriptionTr != '') {
      formData.append('DescriptionTr', item.DescriptionTr);
    }
    if (item.DescriptionEn != null && item.DescriptionEn != '') {
      formData.append('DescriptionEn', item.DescriptionEn);
    }
    if (item.DescriptionAr != null && item.DescriptionAr != '') {
      formData.append('DescriptionAr', item.DescriptionAr);
    }
    if (item.imageUrl) {
      return this.http
        .post(
          `${this.apiUrl}/MenuItems?isSubcategory=${isSubCategory}`,
          formData
        )
        .pipe(catchError(this.handleError));
    }
    item.categoryId = item.categoryId.toString();
    //console.log(item);
    return this.http
      .post(
        `${this.apiUrl}/MenuItems/withoutImage?isSubcategory=${isSubCategory}`,
        item
      )
      .pipe(catchError(this.handleError));
  }

  getAllMenuItems(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse> {
    var resId = this.franchiseService.getRestaurantId();
    return this.http.get<PagedResponse>(
      `${this.apiUrl}MenuItems?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllMenuItemsUnPaged(): Observable<any> {
    return this.http.get<MenuItem[]>(
      `${this.apiUrl}/MenuItems/GetAll?addAuth=true`
    );
  }
  updateOptions(id: number, value: boolean): Observable<any> {
    return this.http.put<MenuItem>(
      `${this.apiUrl}/MenuItems/hasOptions?id=${id}&value=${value}&addAuth=true`,
      null
    );
  }
  getAllItemByCategoryId(categoryId: number): Observable<MenuItem[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<MenuItem[]>(
      `${this.apiUrl}MenuItems/Category?id=${categoryId}`
    );
  }

  getMenuItem(id: number): Observable<SingleMenuItem> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<SingleMenuItem>(`${this.apiUrl}/MenuItems/${id}`);
  }

  getMenuItemOrder(): Observable<OrderMenuItem[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<OrderMenuItem[]>(`${this.apiUrl}/MenuItems/order`)
      .pipe(catchError(this.handleError));
  }
  updateMenuItemOrder(menuItems: OrderMenuItem[]): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/MenuItems/order?addAuth=true`,
      menuItems
    );
  }

  updateRating(id: number, newRating: number): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();
    return this.http.put<any>(
      `${this.apiUrl}MenuItems/Rating?id=${id}&newRating=${newRating}`,
      true
    );
  }

  UpdateMenuItem(
    id: number,
    updatedMenuItem: UpdatMenuItemRequest,
    isSubCategory: boolean
  ): Observable<MenuItem> {
    //console.log('updatedMenuItem', updatedMenuItem);

    // Ensure the correct URL format
    return this.http.put<MenuItem>(
      `${this.apiUrl}/MenuItems/${id}?isSubcategory=${isSubCategory}`,
      updatedMenuItem
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
  searchMenuItems(query: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${this.apiUrl}/MenuItems/search?query=${query}&?addAuth=true`
    );
  }
  byCategory(
    id: number,
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse> {
    //console.log('in service id:' + id);
    return this.http.get<PagedResponse>(
      `${this.apiUrl}/MenuItems/byCategory?id=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}&?addAuth=true`
    ); // Changed 'query' to 'id'
  }

  deleteMenuItem(id: number): Observable<MenuItem> {
    return this.http.delete<MenuItem>(`${this.apiUrl}/MenuItems/${id}`);
  }

  updateItemImage(model: UpdateItemImage): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    if (model.image) {
      formData.append('image', model.image);
    }
    return this.http
      .put(`${this.apiUrl}/MenuItems/image?addAuth=true`, formData)
      .pipe(catchError(this.handleError));
  }
  getPagedData(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.apiUrl}/MenuItems?pageNumber=${pageNumber}&pageSize=${pageSize}&?addAuth=true`
    );
  }
}

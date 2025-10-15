import { inject, Injectable } from '@angular/core';
import { addCategoryRequest } from '../models/Categories Requests DTO/add-category-request.model';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { getAllCategories } from '../models/Categories Requests DTO/get-categroies.model';
import { Updatecategory } from '../models/Categories Requests DTO/update-category.model';
import { UpdateCategoryImage } from '../models/Categories Requests DTO/update-image-category.model';
import { ApplyPercentage } from '../models/Categories Requests DTO/apply-percentage.model';
import { OrderCategoryDTO } from '../models/Categories Requests DTO/order-categories.model';
import { PagedCategories } from '../models/Categories Requests DTO/pagedCategories.model';
import { environment } from '../environments/environment';
import { MenuItem } from '../models/add-menuItem-request/menuItem.model';
import { RequestApplyPercentage } from '../models/Categories Requests DTO/request-apply-percentage.model';
import { ComparePriceService } from './compare-price.service';
import { FranchiseService } from './franchise.service';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  private franchiseService = inject(FranchiseService);
  //apiUrl = 'https://apsolutionsapi.online/api/Category';
  //apiUrl = 'https://localhost:7142/api/Category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<getAllCategories[]> {
    var restaurantId = this.franchiseService.getRestaurantId();
    
    return this.http
      .get<getAllCategories[]>(
        `${this.apiUrl}/restaurants/` + restaurantId + `/categories`
      )
      .pipe(catchError(this.handleError));
  }

  getAllPagedCategories(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedCategories> {
    var restaurantId = this.franchiseService.getRestaurantId();

    return this.http.get<PagedCategories>(
      `${this.apiUrl}/restaurants/` +
        restaurantId +
        `/categories/paged?page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getcategory(categoryId: number): Observable<any> {
    var restaurantId = this.franchiseService.getRestaurantId();

    return this.http
      .get<any>(
        `${this.apiUrl}/restaurants/` +
          restaurantId +
          `/categories/${categoryId}`
      )
      .pipe(catchError(this.handleError));
  }

  updatemodel!: Updatecategory;
  updateCategory(model: Updatecategory): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/Category/update?addAuth=true`, model)
      .pipe(catchError(this.handleError));
  }

  updateCategoryImage(model: UpdateCategoryImage): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    if (model.image) {
      formData.append('image', model.image);
    }
    return this.http
      .put(`${this.apiUrl}/Category/image?addAuth=true`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<any> {
    //console.log('https://localhost:7142/api/Category?id='+ id);
    return this.http
      .delete(`${this.apiUrl}/Category?id=${id}&?addAuth=true`)
      .pipe(catchError(this.handleError));
  }
  toggleVisiblity(id: number): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/Category/hide?id=${id}&?addAuth=true`, null)
      .pipe(catchError(this.handleError));
  }
  addCategory(category: addCategoryRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create FormData and append each field from the model
    const formData = new FormData();
    formData.append('nameAr', category.nameAr);
    formData.append('nameEn', category.nameEn);
    formData.append('nameTr', category.nameTr);

    // Append the file (if exists)
    if (category.CategoryImage) {
      formData.append(
        'CategoryImage',
        category.CategoryImage,
        category.CategoryImage.name
      );
    }
    // Send the form data
    return this.http
      .post(`${this.apiUrl}/Category?addAuth=true`, formData)
      .pipe(catchError(this.handleError));
  }

  request: any = {};
  applyPercentage(
    model: ApplyPercentage,
    menuItems: MenuItem[]
  ): Observable<any> {
    //console.log("model: ", model);
    //console.log("menuItems: ", menuItems);
    this.request.entity = model.entity;
    this.request.id = model.id;
    this.request.type = model.type;
    this.request.percentage = model.percentage;
    this.request.menuItems = menuItems;
    //console.log("to submit api request", this.request);
    return this.http
      .post(`${this.apiUrl}/Category/percentage?addAuth=true`, this.request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle the error here
          //console.error('Error applying percentage:', error);
          return throwError(
            () => new Error(error.error || 'An unknown error occurred')
          ); // Updated to use factory function
        })
      );
  }

  getCategoryOrder(): Observable<OrderCategoryDTO[]> {
    return this.http
      .get<OrderCategoryDTO[]>(`${this.apiUrl}/Category/order?addAuth=true`)
      .pipe(catchError(this.handleError));
  }
  updateCategoryOrder(categories: OrderCategoryDTO[]): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Category/order?addAuth=true`,
      categories
    );
  }

  searchCategories(query: string): Observable<getAllCategories[]> {
    return this.http.get<getAllCategories[]>(
      `${this.apiUrl}/Category/search?query=${query}&?addAuth=true`
    );
  }

  getSingleCategory(categoryId: number): Observable<getAllCategories> {
    return this.http.get<getAllCategories>(
      `${this.apiUrl}/Category/${categoryId}?addAuth=true`
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

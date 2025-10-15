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
import { addSubCategoryRequest } from '../models/SubCategoriesDTO/addSubCategoryDTO.model';
import { getSubCategory } from '../models/SubCategoriesDTO/getSubCategoryDTO.model';
import { FranchiseService } from './franchise.service';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private apiUrl = environment.apiUrl;
  private franchiseService = inject(FranchiseService);

  //apiUrl = 'https://apsolutionsapi.online/api/Category';
  //apiUrl = 'https://localhost:7142/api/Category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<getAllCategories[]> {
    var resId = this.franchiseService.getRestaurantId();
    return this.http
      .get<getAllCategories[]>(
        `${this.apiUrl}/SubCategory`
      )
      .pipe(catchError(this.handleError));
  }
  getAllCategoriesWithNoParent(): Observable<getAllCategories[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<getAllCategories[]>(
        `${this.apiUrl}/SubCategory/noParent`
      )
      .pipe(catchError(this.handleError));
  }
  getAllCategoriesWithParent(): Observable<getAllCategories[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<getAllCategories[]>(
        `${this.apiUrl}/SubCategory/withParent`
      )
      .pipe(catchError(this.handleError));
  }
  getSubByParentId(categoryId: number): Observable<getAllCategories[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<getAllCategories[]>(
        `${this.apiUrl}/SubCategory/get-by-parent/${categoryId}`
      )
      .pipe(catchError(this.handleError));
  }

  assignSubCategoryToParent(
    subCategoryIds: number[],
    parentCategoryId: number
  ): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .put(
        `${this.apiUrl}/SubCategory/assign-parent`,
        {
          subCategoryIds,
          parentCategoryId,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getAllPagedCategories(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedCategories> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<PagedCategories>(
      `${this.apiUrl}/SubCategory/paged?page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getcategory(categoryId: number): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<any>(
        `${this.apiUrl}/SubCategory/${categoryId}`
      )
      .pipe(catchError(this.handleError));
  }

  removeSubCategoriesFromParent(subCategoryIds: number[]): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.put(
      `${this.apiUrl}/SubCategory/remove-parent`,
      {
        subCategoryIds,
      }
    );
  }

  updatemodel!: Updatecategory;
  updateCategory(model: Updatecategory): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .put(
        `${this.apiUrl}/SubCategory/update?addAuth=true`,
        model
      )
      .pipe(catchError(this.handleError));
  }

  updateCategoryImage(model: UpdateCategoryImage): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    const formData = new FormData();
    formData.append('id', model.id.toString());
    if (model.image) {
      formData.append('image', model.image);
    }
    return this.http
      .put(
        `${this.apiUrl}/SubCategory/image?addAuth=true`,
        formData
      )
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    //console.log('https://localhost:7142/api/Category?id='+ id);
    return this.http
      .delete(
        `${this.apiUrl}/SubCategory?id=${id}&?addAuth=true`
      )
      .pipe(catchError(this.handleError));
  }
  toggleVisiblity(id: number): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .put(
        `${this.apiUrl}/SubCategory/hide?id=${id}&?addAuth=true`,
        null
      )
      .pipe(catchError(this.handleError));
  }
  addSubCategory(category: addSubCategoryRequest): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create FormData and append each field from the model
    const formData = new FormData();
    formData.append('nameAr', category.nameAr);
    formData.append('nameEn', category.nameEn);
    formData.append('nameTr', category.nameTr);

    if (category.ParentCategoryId != null) {
      formData.append('ParentCategoryId', category.ParentCategoryId.toString());
    }
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
      .post(
        `${this.apiUrl}/SubCategory?addAuth=true`,
        formData
      )
      .pipe(catchError(this.handleError));
  }

  request: any = {};
  applyPercentage(
    model: ApplyPercentage,
    menuItems: MenuItem[]
  ): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    //console.log('model: ', model);
    //console.log('menuItems: ', menuItems);
    this.request.entity = model.entity;
    this.request.id = model.id;
    this.request.type = model.type;
    this.request.percentage = model.percentage;
    this.request.menuItems = menuItems;
    //console.log('to submit api request', this.request);
    return this.http
      .post(
        `${this.apiUrl}/SubCategory/percentage?addAuth=true`,
        this.request
      )
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
    var resId = this.franchiseService.getRestaurantId();

    return this.http
      .get<OrderCategoryDTO[]>(
        `${this.apiUrl}/SubCategory/order?addAuth=true`
      )
      .pipe(catchError(this.handleError));
  }
  updateCategoryOrder(categories: OrderCategoryDTO[]): Observable<any> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.post(
      `${this.apiUrl}/SubCategory/order?addAuth=true`,
      categories
    );
  }

  searchCategories(query: string): Observable<getAllCategories[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<getAllCategories[]>(
      `${this.apiUrl}/SubCategory/search?query=${query}&?addAuth=true`
    );
  }

  getSingleCategory(categoryId: number): Observable<getAllCategories> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<getAllCategories>(
      `${this.apiUrl}/SubCategory/${categoryId}?addAuth=true`
    );
  }
  getMenuItemsBySubCategoryId(SubCategoryId: number): Observable<MenuItem[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<MenuItem[]>(
      `${this.apiUrl}/SubCategory/get-by-subcategory/${SubCategoryId}`
    );
  }

  hasSubcategories(parentId: number): Observable<boolean | getSubCategory[]> {
    var resId = this.franchiseService.getRestaurantId();

    return this.http.get<boolean | getSubCategory[]>(
      `${this.apiUrl}/SubCategory/has-subcategories/${parentId}`
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

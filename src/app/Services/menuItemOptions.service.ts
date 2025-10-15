import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { CombinedOptionsDTO } from '../models/MenuItemOptionsDTO/CombinedOptionsDTO.model';
import { CombinedOptionsDTORequest } from '../models/MenuItemOptionsDTO/CombinesOptionsRequestDTO.model';
import { FranchiseService } from './franchise.service';

@Injectable({
  providedIn: 'root',
})
export class menuItemOptionsService {
  private apiUrl = environment.apiUrl;
  private frachiseService = inject(FranchiseService);

  constructor(private http: HttpClient) {}

  getMenuItemOptionsByID(parentId: number): Observable<CombinedOptionsDTO> {
    var resID = this.frachiseService.getRestaurantId();
    return this.http
      .get<CombinedOptionsDTO>(`${this.apiUrl}//MenuItemsOptions/${parentId}`)
      .pipe(catchError(this.handleError));
  }

  addMenuItemOptions(request: CombinedOptionsDTORequest): Observable<any> {
    var resID = this.frachiseService.getRestaurantId();

    //console.log(request);
    return this.http.post<CombinedOptionsDTO>(
      `${this.apiUrl}/MenuItemsOptions`,
      request
    );
  }

  private handleError(
    error: HttpErrorResponse
  ): Observable<CombinedOptionsDTO> {
    if (error.status === 404) {
      //console.error("Error 404: Menu item options not found.");
      return of({
        drinkOptions: [],
        foodOptions: [],
        parentId: 0,
        optionsId: 0,
      }); // Return a default empty object instead of throwing an error
    }

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    //console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Throw the error for other statuses
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBranches } from '../models/Branch/get-branch.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/Branch';
  //apiUrl = 'https://localhost:7142/api/Branch';

  constructor(private http: HttpClient) { }

  getAllBranches(): Observable<getBranches[]>{
    return this.http.get<getBranches[]>(this.apiUrl + '/Branch').pipe(
      catchError(this.handleError)
    );;
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

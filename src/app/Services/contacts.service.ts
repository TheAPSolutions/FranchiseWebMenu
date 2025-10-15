import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/Category';
  //apiUrl = 'https://localhost:7142/api/Category';

  constructor(private http: HttpClient) {}

  sendEmail(){
    
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

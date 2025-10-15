import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { LoginDTO } from '../models/LoginModel/login-request.model';
import { LoginResponseModel } from '../models/LoginModel/login-response.model';
import { User } from '../models/LoginModel/user.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  //apiUrl = 'https://apsolutionsapi.online/api/Auth';
  //apiUrl = 'https://localhost:7142/api/Auth';
  $user = new BehaviorSubject<User | undefined>(undefined);
  private cookieService = inject(CookieService);

  constructor(private http: HttpClient) {}

  login(request: LoginDTO): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(this.apiUrl + '/Auth/login', request)
      .pipe(
        tap((response) => {
          //console.log('Login response:', response);
        }), // Log the response
        catchError(this.handleError)
      );
  }

  setUser(user: User): void {
    //console.log('setUser called with:', user); // Add this line
    this.$user.next(user);
    localStorage.setItem('username', user.username);
    localStorage.setItem('roles', user.roles.join(','));
    localStorage.setItem('branchId', user.branchId.toString())
    //console.log('User set in Set User function');
  }

  user(): Observable<User | undefined> {
    //console.log('the user in User function');
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles');
    const branchId = localStorage.getItem('branchId');

    if (username && roles && branchId) {
      const user: User = {
        username: username,
        roles: roles.split(','),
        branchId: parseInt(branchId)
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // You can also log the error to an external logging service if needed
    //console.error('An error occurred:', errorMessage);
    return throwError(errorMessage);
  }
}

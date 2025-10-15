import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7142/api'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  // Example method to get data
  getData(): Observable<any> {
    //console.log(this.http.get(`${this.apiUrl}/User`));
    return this.http.get(`${this.apiUrl}/User`); // Adjust endpoint as necessary
  }

}

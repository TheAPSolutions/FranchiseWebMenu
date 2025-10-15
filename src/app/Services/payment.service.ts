import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:7142/Generate3DHost'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  generate3DHost(amount: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { PurchAmount: amount });
  }
}

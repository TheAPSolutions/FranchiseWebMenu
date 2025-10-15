import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmsOrderReadyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendOrderReady(phoneNumber: string): Observable<any> {
    const payload = { phoneNumber };
    return this.http.post(`${this.apiUrl}/SMSOrderReady`, payload);
  }
}

export interface SmsRequest {
  username: string;
  password: string;
  header: string;
  message: string;
  phoneNumber: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsVerificationService {
  //private apiUrl = 'https://localhost:7142/api/sms/send-otp'; // Replace with your backend URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendOtp(phoneNumber: string, message: string): Observable<any> {
    const payload = { phoneNumber, message };
    return this.http.post(`${this.apiUrl}/sms/send-otp`, payload);
  }


}

export interface SmsRequest {
  username: string;
  password: string;
  header: string;
  message: string;
  phoneNumber: string;
}
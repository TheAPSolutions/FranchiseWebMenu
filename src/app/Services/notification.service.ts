import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource = new BehaviorSubject<string>('');
  private type = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  currenttype = this.type.asObservable();

  showMessage(message: string, type: string){
    this.messageSource.next(message);
    this.type.next(type);
    setTimeout(() => this.clearMessage(), 3000); // Automatically hide after 3 seconds
  }

  clearMessage() {
    this.messageSource.next('');
    this.type.next('');
  }
}

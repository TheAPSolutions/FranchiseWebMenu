import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplyPercentage } from '../models/Categories Requests DTO/apply-percentage.model';

@Injectable({
  providedIn: 'root'
})
export class ComparePriceService {

  private isCompareOpenSubject = new BehaviorSubject<boolean>(false);
  isCompareOpen$ = this.isCompareOpenSubject.asObservable();
  

  model: ApplyPercentage = {
    type: '',
    percentage: 0,
    id: 0,
    entity: ''
  }

  setIsCompareOpen(value: boolean){
    this.isCompareOpenSubject.next(value);
  }


}

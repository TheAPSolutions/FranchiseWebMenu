import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FranchiseService {
  constructor() {}

  private Restaurant_Chosen: string =
    this.loadFromSessionStorage<string>('restaurant_chosen') || '';

  private Restaurant_Id: string =
    this.loadFromSessionStorage<string>('restaurant_id') ||
    '7ec15abf-39e1-42ca-af20-dc23a40def68';

  // BehaviorSubject to hold and update orders
  private restaurantSubject = new BehaviorSubject<string>(
    this.Restaurant_Chosen
  );
  restaurant$ = this.restaurantSubject.asObservable(); // Observable for real-time updates
  // BehaviorSubject to hold and update orders
  private restaurantIdSubject = new BehaviorSubject<string>(this.Restaurant_Id);
  restaurantId$ = this.restaurantIdSubject.asObservable(); // Observable for real-time updates

  // Save to session storage
  private saveToSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Load from session storage
  private loadFromSessionStorage<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Setters
  setRestaurant(value: string): void {
    this.Restaurant_Chosen = value;
    this.saveToSessionStorage('restaurant_chosen', value);
  }
  setRestaurantId(value: string): void {
    this.Restaurant_Id = value;
    this.saveToSessionStorage('restaurant_id', value);
  }

  //getters
  getRestaurant(): string {
    return this.Restaurant_Chosen;
  }
  getRestaurantId(): string {
    return this.Restaurant_Id;
  }
}

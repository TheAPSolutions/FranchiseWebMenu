import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderModel } from '../models/Customer Order model/order-model.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private UsersOrder: OrderModel[] =
    this.loadFromSessionStorage<OrderModel[]>('UsersOrder') || [];

  // BehaviorSubject to hold and update orders
  private ordersSubject = new BehaviorSubject<OrderModel[]>(this.UsersOrder);
  orders$ = this.ordersSubject.asObservable(); // Observable for real-time updates

  private isStudent: boolean =
    this.loadFromSessionStorage<boolean>('isStudent') || false;
  private isRequiredStudent: boolean =
    this.loadFromSessionStorage<boolean>('isRequiredStudent') || false;
  private isTakeaway: boolean =
    this.loadFromSessionStorage<boolean>('isTakeaway') || false;
  private TableNumber: number =
    this.loadFromSessionStorage<number>('TableNumber') || 0;
  private branchId: number =
    this.loadFromSessionStorage<number>('branchId') || 0;
  private totalsum: number =
    this.loadFromSessionStorage<number>('totalsum') || 0;
    private isCash: boolean =
    this.loadFromSessionStorage<boolean>('isCash') || false;
    private phoneNumber: string =
    this.loadFromSessionStorage<string>('phoneNumber') || "";
    private isAcceptCampagin: boolean =
    this.loadFromSessionStorage<boolean>('isAcceptCampagin') || false;

  constructor() {}

  // Add an order to the list
  addOrder(
    orderId: number,
    price: number,
    studentPrice: number,
    takeawayPrice: number,
    hasOptions: boolean,
    drinkOption:number,
    foodOption: number
  ): void {
    const existingOrder = this.UsersOrder.find((u) => u.itemId === orderId);
    if (existingOrder) {
      if(existingOrder.hasOptions){
        const newOrder: OrderModel = {
          itemId: orderId,
          amount: 1,
          price: price,
          studentPrice: studentPrice,
          takeawayprice: takeawayPrice,
          hasOptions: hasOptions,
          drinkOption: drinkOption,
          foodOption: foodOption
        };
        this.UsersOrder.push(newOrder);
        //console.log("Added Order:", newOrder);
      }else {
        existingOrder.amount++;
      }
    } else {
      const newOrder: OrderModel = {
        itemId: orderId,
        amount: 1,
        price: price,
        studentPrice: studentPrice,
        takeawayprice: takeawayPrice,
        hasOptions: hasOptions,
        drinkOption: drinkOption,
        foodOption: foodOption
      };
      this.UsersOrder.push(newOrder);
      //console.log("Added Order:", newOrder);

    }
    this.ordersSubject.next(this.UsersOrder);
    this.updateTotalSum();
    this.saveToSessionStorage('UsersOrder', this.UsersOrder);
  }
  addOptiontoOrder(id: number, drinkId:number, foodId:number){
    const order = this.UsersOrder.find((u) => u.itemId === id && u.drinkOption == 0 && u.foodOption == 0);
    if (order) {
      order.hasOptions = true;
      if (drinkId > 0){
        order.drinkOption = drinkId;
      }
      if (foodId > 0){
        order.foodOption = foodId;
      }
      this.ordersSubject.next(this.UsersOrder);
      this.saveToSessionStorage('UsersOrder', this.UsersOrder);
    }
  }
 EditOptiontoOrder(IncomingOrder:OrderModel, drinkId:number, foodId:number){
    const order = this.UsersOrder.find((u) => u === IncomingOrder);
    if (order) {
      order.hasOptions = true;
      if (drinkId > 0){
        order.drinkOption = drinkId;
      }
      if (foodId > 0){
        order.foodOption = foodId;
      }
      this.ordersSubject.next(this.UsersOrder);
      this.saveToSessionStorage('UsersOrder', this.UsersOrder);
    }
  }

  // Remove an order by its ID

  removeOrder(id: OrderModel): void {
    // Check if the removed item is from the student menu
    const isStudentItem = id.studentPrice !== 0;
  
    // Remove the order
    this.UsersOrder = this.UsersOrder.filter((order) => order !== id);
    this.ordersSubject.next(this.UsersOrder);
    this.updateTotalSum();
    this.saveToSessionStorage('UsersOrder', this.UsersOrder);
  
    // If the removed item was a student item, check if there are any student items left
    if (isStudentItem) {
      const hasRemainingStudentItems = this.UsersOrder.some(order => order.studentPrice !== 0);
      
      // If no student items remain, set isRequiredStudent to false
      if (!hasRemainingStudentItems) {
        this.setIsRequiredStudent(false);
      }
    }
  }
  
    


  // Decrease the amount of a specific order
  decreaseAmount(id: number): void {
    const order = this.UsersOrder.find((u) => u.itemId === id);
    if (order) {
      order.amount--;
      if (order.amount === 0) {
        this.removeOrder(order);
      } else {
        this.ordersSubject.next(this.UsersOrder);
        this.updateTotalSum();
      }
    }
  }

  // Add notes to an order
  addNotes(Incomingorder:OrderModel, notes: string): void {
    const order = this.UsersOrder.find((u) => u === Incomingorder);
    if (order) {
      order.notes = notes;
      this.ordersSubject.next(this.UsersOrder);
    }
  }

  // Clear all orders
  clearOrders(): void {
    this.UsersOrder = [];
    this.ordersSubject.next(this.UsersOrder);
    this.updateTotalSum();
    this.saveToSessionStorage('UsersOrder', this.UsersOrder);
  }

  // Update the total sum based on current orders
  private updateTotalSum(): void {
    this.totalsum = this.UsersOrder.reduce(
      (sum, order) => sum + order.price * order.amount,
      0
    );
    this.saveToSessionStorage('totalsum', this.totalsum);
  }

  // Save to session storage
  private saveToSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Load from session storage
  private loadFromSessionStorage<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  getAmount(id: number): number {
    const order = this.UsersOrder.find((u) => u.itemId === id);
    return order ? order.amount : 0; // Return the amount or 0 if not found
  }

  getNotes(id: number): string {
    const order = this.UsersOrder.find((u) => u.itemId === id);
    return order?.notes || '';
  }

  getOrder(id: number): OrderModel | undefined {
    return this.UsersOrder.find((u) => u.itemId === id);
  }

  getOrderOptions(id: number, drinkId:number, foodId:number): OrderModel | undefined {
    return this.UsersOrder.find((u) => u.itemId === id && u.drinkOption == drinkId && u.foodOption == foodId);
  }
  


  // Getters
  getIsStudent(): boolean {
    return this.isStudent;
  }
  getIsAcceptCampagin(): boolean {
    return this.isAcceptCampagin;
  }

  getIsRequiredStudent(): boolean {
    return this.isRequiredStudent;
  }

  getIsTakeaway(): boolean {
    return this.isTakeaway;
  }

  getTableNumber(): number {
    return this.TableNumber;
  }

  getBranchId(): number {
    return this.branchId;
  }

  getTotalSum(): number {
    return this.totalsum;
  }
  getPhoneNumber(): string {
    return this.phoneNumber;
  }
  
  getisCash(): boolean {
    return this.isCash;
  }

  getUserOrders(): OrderModel[] {
    return this.UsersOrder;
  }

  getUserOrders$() {
    return this.orders$; // Observable for real-time updates
  }

  // Setters
  setIsStudent(value: boolean): void {
    this.isStudent = value;
    this.saveToSessionStorage('isStudent', value);
  }
  setIsAcceptCampagin(value: boolean): void {
    this.isAcceptCampagin = value;
    this.saveToSessionStorage('isAcceptCampagin', value);
  }

  setIsRequiredStudent(value: boolean): void {
    this.isRequiredStudent = value;
    this.saveToSessionStorage('isRequiredStudent', value);
  }

  setIsTakeaway(value: boolean): void {
    this.isTakeaway = value;
    this.saveToSessionStorage('isTakeaway', value);
  }
  setIsCash(value: boolean): void {
    this.isCash = value;
    this.saveToSessionStorage('isCash', value);
  }

  setTableNumber(value: number): void {
    this.TableNumber = value;
    this.saveToSessionStorage('TableNumber', value);
  }

  setBranchId(value: number): void {
    this.branchId = value;
    this.saveToSessionStorage('branchId', value);
  }
  setPhoneNumber(value: string): void {

    this.phoneNumber = value;
    this.saveToSessionStorage('phoneNumber', value);
  }

  setTotalSum(value: number): void {
    this.totalsum = value;
    this.saveToSessionStorage('totalsum', value);
  }

  setUserOrders(orders: OrderModel[]): void {
    this.UsersOrder = orders;
    this.ordersSubject.next(this.UsersOrder);
    this.saveToSessionStorage('UsersOrder', orders);
  }



}

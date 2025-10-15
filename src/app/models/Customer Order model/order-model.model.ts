export interface OrderModel{
    itemId: number;
    amount: number;
    notes?: string;
    price: number;
    studentPrice: number;
    takeawayprice: number;
    hasOptions: boolean;
    drinkOption: number;
    foodOption: number;
}
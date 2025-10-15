export interface MenuItem {
    id: number;
    nameTr: string;
    nameEn: string;
    nameAr: string;
    descriptionTr: string;
    descriptionEn: string;
    descriptionAr: string;
    priceTr: number;
    priceEn: number;
    priceAr: number;

    discountedPriceTr : number;
    discountedPriceEn : number;
    discountedPriceAr : number;
    studentPrice? : number;
    imageUrl : string;
    itemOrder: number;
    isVisible: boolean;
    numberOfTimesOrdered: number;
    categoryId: string; 
    ratingValue: number;
    hasOptions: boolean;


}

export interface SingleMenuItem{
    id: number;
    priceEn: number;
    priceAr: number;
    priceTr: number;

    imageUrl: string;
    nameEn: string;
    nameAr: string;
    nameTr: string;

    descriptionEn: string; 
    descriptionAr: string;
    descriptionTr: string;

    discountedPriceTr: number;
    discountedPriceEn : number;
    discountedPriceAr: number;
    ratingValue: number;

    categoryName:string;

    studentPrice:number;
    hasOptions: boolean;
}
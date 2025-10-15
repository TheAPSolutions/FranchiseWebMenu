export interface AddMenuItemRequest {
    NameTr: string;
    NameEn: string;
    NameAr: string;
    DescriptionTr?: string;
    DescriptionEn?: string;
    DescriptionAr?: string;
    PriceTr: string;
    PriceEn: string;
    PriceAr: string;
    StudentPrice? : string;
    DiscountedPriceTr : string;
    DiscountedPriceEn : string;
    DiscountedPriceAr : string;
    imageUrl : File | null;
    categoryId: string;
}

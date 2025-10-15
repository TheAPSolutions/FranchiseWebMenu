export interface addSubCategoryRequest{
  nameEn: string;
  nameTr: string;
  nameAr: string;
  CategoryImage: File | null; 
  ParentCategoryId: number | null;
}
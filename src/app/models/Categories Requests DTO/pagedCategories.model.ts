import { getAllCategories } from "./get-categroies.model";

export interface PagedCategories{


    totalRecords: number;
    totalPages: number;
    currentPage: number;
    data: getAllCategories[];

}
import { Offers } from "./offers.model";

export interface getPagedOffers{
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    data: Offers[];
}
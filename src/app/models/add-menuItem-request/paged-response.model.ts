import { MenuItem } from "./menuItem.model";

export interface PagedResponse {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    data: MenuItem[];
  }
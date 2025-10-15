import { MenuItem } from "../add-menuItem-request/menuItem.model";

export interface RequestApplyPercentage{
    id: number;
    type: string;
    percentage?: number;
    entity: string;
    menuItems: MenuItem[];
}
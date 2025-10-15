import { DrinksDTO } from "./DrinksDTO.model";
import { ItemsDTO } from "./ItemsDTO.model";

export interface CombinedOptionsDTORequest{

    foodOptions:number[];
    drinkOptions:number[];
    parentId: number;
}
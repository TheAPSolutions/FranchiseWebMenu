import { DrinksDTO } from "./DrinksDTO.model";
import { ItemsDTO } from "./ItemsDTO.model";

export interface CombinedOptionsDTO{

    drinkOptions:DrinksDTO[];
    foodOptions:ItemsDTO[];
    parentId: number;
    optionsId: number;
}
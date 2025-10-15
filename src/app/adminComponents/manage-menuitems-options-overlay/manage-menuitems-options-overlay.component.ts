import { Component, EventEmitter, inject, input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { CombinedOptionsDTO } from '../../models/MenuItemOptionsDTO/CombinedOptionsDTO.model';
import { menuItemOptionsService } from '../../Services/menuItemOptions.service';
import { DrinksDTO } from '../../models/MenuItemOptionsDTO/DrinksDTO.model';
import { DrinksDTOTwo } from '../../models/MenuItemOptionsDTO/DrinksDTO2.model';
import { ItemsDTO } from '../../models/MenuItemOptionsDTO/ItemsDTO.model';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { CategoryService } from '../../Services/category.service';
import { ItemsDTOTwo } from '../../models/MenuItemOptionsDTO/ItemsDTO2.model';
import { CombinedOptionsDTORequest } from '../../models/MenuItemOptionsDTO/CombinesOptionsRequestDTO.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-manage-menuitems-options-overlay',
  templateUrl: './manage-menuitems-options-overlay.component.html',
  styleUrl: './manage-menuitems-options-overlay.component.scss'
})
export class ManageMenuitemsOptionsOverlayComponent implements OnInit {

    @Output() isVisible = new EventEmitter<[boolean, number]>(); // Tuple type
    ParentMenuItemId = input.required<number>();

    menuItemService = inject(MenuItemsServiceService);
    showDrinks: boolean = false;
    showItems: boolean = false;
    menuItemOptionsService = inject(menuItemOptionsService);
    categoryService = inject(CategoryService);
    options: CombinedOptionsDTO = { drinkOptions: [], foodOptions: [], parentId:0, optionsId: 0 }; // Initialize directly
    drinksFromDB: DrinksDTOTwo[] = [];
    selectedOptions: CombinedOptionsDTO = { drinkOptions: [], foodOptions: [], parentId:0, optionsId: 0 }; // Initialize directly
    categories: getAllCategories[] = [];
    categorySelected: number = 0;
    itemsFromDB: ItemsDTOTwo[] = [];

    languageService = inject(LanguageService);
    language = this.languageService.getLanguage();

    ManageMenuItemsTitle        : WritableSignal<string> = signal('');
    pleaseSelectFollowingTitle   : WritableSignal<string> = signal('');
    hasDrinks                    : WritableSignal<string> = signal('');
    hasItems                        : WritableSignal<string> = signal('');
    drinks                         : WritableSignal<string> = signal('');
    items                        : WritableSignal<string> = signal('');
    noSelectionsYet               : WritableSignal<string> = signal('');
    saveChangesTitle               : WritableSignal<string> = signal('');

    newCat: {name: string; id: number;}[] = [];

    categoryTitle  : WritableSignal<string> = signal('');
    

    ngOnInit(): void {
      this.updateTitles();
      this.languageService.currentLanguage$.subscribe(() => {
        
        this.language  = this.languageService.getLanguage();
        this.updateTitles();
      })
      this.menuItemOptionsService.getMenuItemOptionsByID(this.ParentMenuItemId()).subscribe({
        next: (response) => {
          this.options = response;
          this.selectedOptions = response;
          this.callCategories();
          if(this.options.drinkOptions.length > 0){
            this.ToggleDrinkSelection(true);
          }if(this.options.foodOptions.length > 0){
            this.ToggleItemSelection(true);
          }
          //console.log("This item options: ", this.options);
        },
        error: (error) => {
          //console.error("An error occurred:", error);
        }
      });


    }

    onClose(){
      this.isVisible.emit([false, this.ParentMenuItemId()]);
    }
    callDrinks() {
      this.menuItemService.getAllItemByCategoryId(26).subscribe({
        next: (response) => {
          this.drinksFromDB = response.map(item => ({
            id: item.id,
            image: item.imageUrl,
            nameEn: item.nameEn,
            nameTr: item.nameTr,
            nameAr: item.nameAr,
            checked: (this.options?.drinkOptions ?? []).some(drink => drink.id === item.id) // ✅ Store checked only in UI list
          }));
        },
        error: (response) => {
          //console.log(response);
        }
      });
    }
    
    callCategories(){
      this.categoryService.getAllCategories().subscribe({
        next: (response) => {
          this.categories = response;
          switch(this.language.toLowerCase()){
            case 'en':   
            this.newCat = this.categories.map(category => ({
              name: category.nameEn, 
              id: category.id
            }));
            //console.log(this.newCat);
              break;
            case 'tr':
              this.newCat = this.categories.map(category => ({
                name: category.nameTr, 
                id: category.id
              }));
              //console.log(this.newCat);
              break;
            case 'ar':
              this.newCat = this.categories.map(category => ({
                name: category.nameAr, 
                id: category.id
              }));
              //console.log(this.newCat);
              break;

          }
        },
        error: (response) => {
          //console.log(response);
        }
      })
    }
    ToggleDrinkSelection(event: boolean){
        this.showDrinks = event;
        if (this.showDrinks) {
          this.callDrinks();
        }
    }

    ToggleItemSelection(event: boolean) {
      this.showItems = event;
      if (this.showItems) {
        //console.log("calling");

      }
    }

    onDrinkCheckboxChange(drink: DrinksDTOTwo, isChecked: boolean) {
      if (isChecked) {
        if (!this.selectedOptions.drinkOptions.some(d => d.id === drink.id)) {
          this.selectedOptions.drinkOptions.push({
            id: drink.id,
            image: drink.image,
            nameEn: drink.nameEn,
            nameTr: drink.nameTr,
            nameAr: drink.nameAr
          } as DrinksDTO); // ✅ Exclude `checked`
        }
      } else {
        this.selectedOptions.drinkOptions = this.selectedOptions.drinkOptions.filter(d => d.id !== drink.id);
      }
    
      //console.log("Updated Selected Drinks (without checked):", this.selectedOptions.drinkOptions);
    }
    
    
    onItemCheckboxChange(item: ItemsDTOTwo, isChecked: boolean) {
      if (isChecked) {
        if (!this.selectedOptions.foodOptions.some(i => i.id === item.id)) {
          this.selectedOptions.foodOptions.push({
            id: item.id,
            image: item.image,
            nameEn: item.nameEn,
            nameTr: item.nameTr,
            nameAr: item.nameAr
          } as ItemsDTO); // ✅ Exclude `checked`
        }
      } else {
        this.selectedOptions.foodOptions = this.selectedOptions.foodOptions.filter(i => i.id !== item.id);
      }
    
      //console.log("Updated Selected Items (without checked):", this.selectedOptions.foodOptions);
    }
    
    
    onCategorySelection(catId: number){
      this.categorySelected = catId;
      this.callMenuItemsByCategory();
    }
    callMenuItemsByCategory() {
      this.menuItemService.getAllItemByCategoryId(this.categorySelected).subscribe({
        next: (response) => {
          this.itemsFromDB = response.map(item => ({
            id: item.id,
            image: item.imageUrl,
            nameEn: item.nameEn,
            nameTr: item.nameTr,
            nameAr: item.nameAr,
            checked: (this.options?.foodOptions ?? []).some(existingItem => existingItem.id === item.id) // ✅ Only in UI
          }));
        },
        error: (response) => {
          //console.log(response);
        }
      });
    }
    
    combinedRequest!:CombinedOptionsDTORequest;
    saveChanges() {
      if (!this.combinedRequest) {
        this.combinedRequest = { drinkOptions: [], foodOptions: [], parentId: 0 }; // Ensure it's initialized
      }
    
      this.selectedOptions.drinkOptions.forEach((drink) => {
        this.combinedRequest.drinkOptions.push(drink.id);
      });
      this.selectedOptions.foodOptions.forEach((item) => {
        this.combinedRequest.foodOptions.push(item.id);
      });

    
      this.combinedRequest.parentId = this.ParentMenuItemId();
    
      //console.log("Final Combined Request (No checked):", this.combinedRequest);
    
      this.menuItemOptionsService.addMenuItemOptions(this.combinedRequest).subscribe({
        next: (response) => {
          this.isVisible.emit([false, this.ParentMenuItemId()]);
        },
        error: (err) => {
          //console.log(err);
        }
      });
    }

    updateTitles() {
      this.ManageMenuItemsTitle = this.languageService.manageMenuItemOptions;
      this.pleaseSelectFollowingTitle =  this.languageService.pleaseSelectFollowing;
      this.hasDrinks                 = this.languageService.hasDrinks;
      this.hasItems                  = this.languageService.hasItems;
      this.drinks                    = this.languageService.drinks;
      this.items                     = this.languageService.items;
      this.noSelectionsYet           = this.languageService.noSelectionsYet;
      this.saveChangesTitle          = this.languageService.saveChanges;
      this.categoryTitle  = this.languageService.categoryName;
      this.callCategories();

    }
    
    
  }
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComparePriceService } from '../../Services/compare-price.service';
import { CategoryService } from '../../Services/category.service';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { LanguageService } from '../../Services/language.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';

@Component({
  selector: 'app-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss']
})
export class ComparePricesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  priceService = inject(ComparePriceService);
  categoryService = inject(CategoryService);
  MenuItemsService = inject(MenuItemsServiceService);
  languageService = inject(LanguageService);

  categoryName = '';
  percentageValue = 0;
  title = '';
  menuItems: MenuItem[] = [];
  newMenuItems: MenuItem[] = [];
  IscompareOpened = false;

  priceTitle = '';
  langauge = this.languageService.getLanguage();
  typeTitle = '';

  @Output() success = new EventEmitter<boolean>(false);

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.langauge = lang;
      this.updateTitles();
    });


    this.priceService.isCompareOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((is) => {
        this.IscompareOpened = is;
        if (is) {
          this.getCategoryTitle();
          this.percentageValue = this.priceService.model.percentage || 0;
          this.title = this.priceService.model.type;
          this.getMenuItems();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  category!: getAllCategories;
  getCategoryTitle() {
    this.categoryService.getSingleCategory(this.priceService.model.id).subscribe({
      next: (result) => {
        this.category = result;
        console.log(this.category);
        this.updateTitles();
      }
    });
  }

  updateTitles(){
    switch(this.langauge.toLowerCase()){
      case 'en':
        this.categoryName = this.category.nameEn;
        this.priceService.model.type === 'increase' ? this.title = 'increase' : this.title = 'decrease';
        this.priceTitle = 'price';
        this.priceService.model.entity  === 'indirim' ? this.typeTitle = 'discounted' : this.typeTitle = '';
        break;
      case 'ar':
        this.categoryName = this.category.nameAr;
        this.priceService.model.type === 'increase'? this.title = 'زيادة '.trim() : this.title = 'تخفيض '.trim();
        this.priceTitle = 'الاسعار';
        this.priceService.model.entity  === 'indirim' ? this.typeTitle = 'حسم' : this.typeTitle = '';
        break;
      case 'tr':
        this.categoryName = this.category.nameTr;
        this.priceService.model.type === 'increase'? this.title = 'arttır' : this.title = 'azalttır';
        this.priceTitle = 'fıyatı';
        this.priceService.model.entity  === 'indirim' ? this.typeTitle = 'indirim' : this.typeTitle = '';
        break;
    }

    console.log(this.categoryName);
  }

  getMenuItems() {
    this.MenuItemsService.getAllItemByCategoryId(this.priceService.model.id).subscribe({
      next: (result) => {
        this.menuItems = result;
        //console.log("Before", this.menuItems);
        this.newMenuItems = JSON.parse(JSON.stringify(this.menuItems)); // Deep copy
        this.calculateDiscountedPrices();
      }
    });
  }
  calculateDiscountedPrices() {
    const factor = this.priceService.model.type === "increase"
      ? 1 + this.percentageValue / 100.0
      : 1 - this.percentageValue / 100.0;
  
    this.newMenuItems.forEach((item, i) => {
      if (this.priceService.model.entity === "indirim") {
        this.newMenuItems[i].priceAr = Math.round(this.menuItems[i].discountedPriceAr * factor);
        this.newMenuItems[i].priceTr = Math.round(this.menuItems[i].discountedPriceTr * factor);
        this.newMenuItems[i].priceEn = Math.round(this.menuItems[i].discountedPriceEn * factor);
      } else {
        this.newMenuItems[i].priceAr = Math.round(this.menuItems[i].priceAr * factor);
        this.newMenuItems[i].priceTr = Math.round(this.menuItems[i].priceTr * factor);
        this.newMenuItems[i].priceEn = Math.round(this.menuItems[i].priceEn * factor);
      }
    });
  
    //console.log("new: ", this.newMenuItems);
  }
  

  resetState() {
    this.IscompareOpened = false;
    this.priceService.setIsCompareOpen(false);
    this.menuItems = [];
    this.newMenuItems = [];
    this.title = '';
    this.categoryName = '';
  }

  closeClicked() {
    this.resetState();
  }

  submitChanged(){
    //console.log("Submitted these values", this.newMenuItems);
    this.submitIncrease();
    this.resetState();
  }

  submitIncrease() {
    
    this.categoryService.applyPercentage(this.priceService.model, this.newMenuItems).subscribe({
      next: (response) => {
        this.success.emit(true);
        //console.log(response);
      },
      error: (error) => {
        //console.log("Error", error);
    }
  });
  }
}

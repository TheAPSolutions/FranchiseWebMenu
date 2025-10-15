import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { CategoryService } from '../../Services/category.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { SubCategoryService } from '../../Services/subcategory.service';
import { Router } from '@angular/router';
import { getSubCategory } from '../../models/SubCategoriesDTO/getSubCategoryDTO.model';

@Component({
  selector: 'app-page-sub-categories-users',
  templateUrl: './page-sub-categories-users.component.html',
  styleUrl: './page-sub-categories-users.component.scss',
})
export class PageSubCategoriesUsersComponent {
  subCategories: getSubCategory[] = [];
  languageService = inject(LanguageService);

  MenuTitle: WritableSignal<string> = signal('');

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  categories?: getAllCategories[];
  isLoading: boolean = true; // Loading state
  language = 'Tr';
  hasSubcategories = false;
  queryParams?: { id: number, FromSubCategory: boolean };
  private router = inject(Router);
  ngOnInit(): void {
    // Retrieve subcategories from `state`
    if (history.state.subCategories) {
      this.subCategories = history.state.subCategories;
      this.subCategories?.sort((a, b) => a.categoryOrder - b.categoryOrder);
      //console.log('Received subCategories:', this.subCategories);
      this.isLoading = false;
    } else {
      //console.log('No subCategories found in state.');
      this.subCategories = []; // Ensure it's an empty array
    }
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.languageService.getLanguage();
    // Initialize titles based on the default language
    this.updateTitles();
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.MenuTitle = this.languageService.MenuPageTitle;
    this.NavLeft = this.languageService.Home;
    this.NavRight = this.languageService.Cart;
    this.language = this.languageService.getLanguage();
  }
  
  checkSubcategories(parentId: number, item: any): void {
    this.queryParams = { id: item.id, FromSubCategory: true };
    this.router.navigate(['/menu/menuItems'], { queryParams: this.queryParams });
  }
  
}

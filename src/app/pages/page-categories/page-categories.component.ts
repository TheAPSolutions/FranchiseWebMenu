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
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrl: './page-categories.component.scss',
})
export class PageCategoriesComponent implements OnInit {
  languageService = inject(LanguageService);
  private categoryService = inject(CategoryService);
  private subCategoryService = inject(SubCategoryService);

  MenuTitle: WritableSignal<string> = signal('');

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  categories?: getAllCategories[];
  isLoading: boolean = true; // Loading state
  language = 'Tr';
  hasSubcategories = false;
  subCategories?: getSubCategory[];
  queryParams?: { id: number };
  private router = inject(Router);

  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.languageService.getLanguage();

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;

        //console.log('categories page',this.categories);

        // Sort the categories based on 'ordernumber' from smallest to largest
        this.categories?.sort((a, b) => a.ordernumber - b.ordernumber);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });

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
    this.subCategoryService.hasSubcategories(parentId).subscribe(
      (response) => {
        //console.log(response);
        if (response === false) {
          //console.log('No subcategories found.');
          this.hasSubcategories = false;

          // No subcategories, go directly to menu items
          this.queryParams = { id: item.id };
          this.router.navigate(['/menu/menuItems'], {
            queryParams: this.queryParams,
          });
        } else {
          //console.log('Subcategories:', response);
          this.hasSubcategories = true;
          this.subCategories = response as getSubCategory[];
          if (this.subCategories.some((subCategory) => subCategory.isVisible)) {
            // At least one subcategory is visible
            // Has subcategories, go to subcategory page
            this.queryParams = { id: item.id };
            this.router.navigate(['/menu/subCategories'], {
              queryParams: { parentId: parentId },
              state: { subCategories: this.subCategories }, // ✅ Pass data via state
            });
          } else {
            // No subcategories are visible
            this.hasSubcategories = false;

            // No subcategories, go directly to menu items
            this.queryParams = { id: item.id };
            this.router.navigate(['/menu/menuItems'], {
              queryParams: this.queryParams,
            });
          }
        }
      },
      (error) => {
        //console.error('Error fetching subcategories:', error);
      }
    );
  }
}

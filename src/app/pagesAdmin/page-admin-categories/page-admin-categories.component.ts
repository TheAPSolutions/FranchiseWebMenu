import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { NotificationService } from '../../Services/notification.service';
import { PagedCategories } from '../../models/Categories Requests DTO/pagedCategories.model';
import { ComparePricesComponent } from '../../components/compare-prices/compare-prices.component';
import { LanguageService } from '../../Services/language.service';
@Component({
  selector: 'app-page-admin-categories',
  templateUrl: './page-admin-categories.component.html',
  styleUrl: './page-admin-categories.component.scss',
})
export class PageAdminCategoriesComponent implements OnInit {
  categories?: getAllCategories[];
  constructor(private categoryService: CategoryService) {}
  notificationService = inject(NotificationService);
  isVisible: boolean = false;

  isCompareVisible = false;

  @ViewChild('appComparePrices') compareComponent!: ComparePricesComponent;

  handleVisibility(id: boolean) {
    this.isVisible = !this.isVisible;
  }

  searchQuery!: string;

  //pagintation variables
  currentPage: number = 1; // Start on the first page
  pageSize: number = 12; // Number of items per page
  totalItems: number = 0; // Total number of items
  totalPages: number = 0; // Number of pages
  itemsArray: number[] = [];

  image!: string;

  private languageService = inject(LanguageService);
  AddCategory: WritableSignal<string> = signal('');
  Categories: WritableSignal<string> = signal('');
  NoCategories: WritableSignal<string> = signal('');
  

  loadCategories() {
    this.categoryService
      .getAllPagedCategories(this.currentPage, this.pageSize)
      .subscribe(
        (data) => {
          this.categories = data.data;
          this.totalItems = data.totalRecords; // Update total items
          this.totalPages = data.totalPages;
          this.itemsArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
        (error) => {
          this.ErrorMessage();
          //console.error('Error fetching categories', error);
        }
      );
  }
  ngOnInit(): void {
    this.loadCategories();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  ngAfterViewInit(): void {
    // `compareComponent` will be defined here
    //console.log('compare (AfterViewInit):', this.compareComponent);

    this.isCompareVisible = this.compareComponent.IscompareOpened;
  }

  onChange(chnaged: boolean) {
    this.loadCategories();
  }

  showSuccessMessage() {
    this.notificationService.showMessage(
      'Successfully Added Category',
      'success'
    );
  }
  showDeletedMessage() {
    this.notificationService.showMessage('Deleted Category', 'danger');
  }
  showUpdatedMessage() {
    this.notificationService.showMessage(
      'Successfully Updated Category',
      'success'
    );
  }

  showUpdatedVisibilityMessage() {
    this.notificationService.showMessage(
      'Changed Visibility Status!',
      'warning'
    );
  }

  showErrorMessage(message: string) {
    //console.log('herrre');
    this.notificationService.showMessage(message, 'danger');
  }
  captureID(itemId: number) {
    if (this.categories) {
      this.categories.forEach((c) => {
        if (c.id == itemId) {
          this.image = c.categoryImage;
        }
      });
    }
  }
  handlePercentageApplied() {
    this.notificationService.showMessage(
      'Applied Percentage Successfully!',
      'success'
    );
  }

  catchQuery(q: string) {
    if (q.length > 0) {
      this.categoryService.searchCategories(q).subscribe({
        next: (data) => {
          this.categories = data; // Update the categories array with the results
        },
        error: (error) => {
          //console.error('Error fetching categories', error);
          this.ErrorMessage();
        },
      });
    } else {
      this.loadCategories();
    }
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      this.loadCategories(); // Load items for the new page
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement currentPage
      this.loadCategories(); // Load items for the new page
    }
  }
  changePage(page: number) {
    this.currentPage = page;
    this.loadCategories(); // Reload items for the new page
  }

  updateTitles() {
    this.AddCategory = this.languageService.AddCategroy;
    this.Categories = this.languageService.Categories;
    this.NoCategories = this.languageService.NoCategories;
  }
}

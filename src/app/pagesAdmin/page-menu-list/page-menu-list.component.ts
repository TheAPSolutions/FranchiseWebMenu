import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { NotificationService } from '../../Services/notification.service';
import { CategoryService } from '../../Services/category.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-menu-list',
  templateUrl: './page-menu-list.component.html',
  styleUrls: ['./page-menu-list.component.scss'],
})
export class PageMenuListComponent implements OnInit {
  private menuItemService = inject(MenuItemsServiceService);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);
  image!: string;

  menuItems?: MenuItem[];
  categories: { name: string; id: number }[] = [];
  filterCategory?: number;
  itemsArray: number[] = [];

  isVisible: boolean = false;
  isManageOptionsVisible: boolean = false;

  selectedCategoryId: number | null = null;

  private languageService = inject(LanguageService);
  MenuItems: WritableSignal<string> = signal('');
  AddItem: WritableSignal<string> = signal('');
  Categories: WritableSignal<string> = signal('');
  language = 'En';

  ngOnInit(): void {
    this.loadMenuItems();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.languageService.getLanguage();
  }

  handleVisibility(id: boolean) {
    this.isVisible = !this.isVisible;
  }

  parentMenuItemId!: number;
  handleManageOptionsVisiblity(event: [boolean, number]){
    this.isManageOptionsVisible = event[0];
    this.parentMenuItemId = event[1];
  }

  index = 0;
  // Pagination properties
  currentPage: number = 1; // Start on the first page
  pageSize: number = 12; // Number of items per page
  totalItems: number = 0; // Total number of items
  totalPages: number = 0; // Number of pages

  loadMenuItems() {
    const serviceCall = this.selectedCategoryId
      ? this.menuItemService.byCategory(
          this.selectedCategoryId,
          this.currentPage,
          this.pageSize
        )
      : this.menuItemService.getAllMenuItems(this.currentPage, this.pageSize);

    serviceCall.subscribe({
      next: (response) => {
        this.menuItems = response.data; // Update menu items
        //console.log(this.menuItems);
        this.totalItems = response.totalRecords; // Update total items
        this.totalPages = response.totalPages; // Update total pages
        this.itemsArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
        this.loadCategories();
      },
      error: (err) => {
        this.ErrorMessage();
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMenuItems();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMenuItems();
    }
  }

  loadCategories() {

    if(this.language == 'En'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data);
          this.categories = data.map((category) => ({
            name: category.nameEn,
            id: category.id,
          }));
          //console.log('categories En', this.categories);
        },
        error: (err) => {
          //console.error('Error occurred while fetching categories:', err);
        },
      });
    } else if(this.language == 'Ar'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data);
          this.categories = data.map((category) => ({
            name: category.nameAr,
            id: category.id,
          }));
          //console.log('categories En', this.categories);
        },
        error: (err) => {
          //console.error('Error occurred while fetching categories:', err);
        },
      });
    } else if(this.language == 'Tr'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data);
          this.categories = data.map((category) => ({
            name: category.nameTr,
            id: category.id,
          }));
          //console.log('categories En', this.categories);
        },
        error: (err) => {
          //console.error('Error occurred while fetching categories:', err);
        },
      });
    }

  }

  onChange(chnaged: boolean) {
    this.ngOnInit();
  }

  onCategorySelect(id: number) {
    this.selectedCategoryId = id; // Save the selected category
    this.currentPage = 1; // Reset to the first page when changing categories
    this.loadMenuItems(); // Load the items for the selected category
  }

  changePage(page: number | string): void {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.loadMenuItems();
    }
  }

  showSuccessMessage() {
    this.notificationService.showMessage(
      'Successfully Deleted Item',
      'success'
    );
  }

  showSuccessUpdateMessage() {
    this.notificationService.showMessage(
      'Item Updated Successfully',
      'success'
    );
    this.loadMenuItems();
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  catchQuery(q: string) {
    if (q.length > 0) {
      this.menuItemService.searchMenuItems(q).subscribe({
        next: (data) => {
          this.menuItems = data; // Update the menu items with the search results
          //console.log(this.menuItems);
        },
        error: (error) => {
          this.notificationService.showMessage('no items found', 'danger');
          //console.error('Error fetching menu items', error);
        },
      });
    } else {
      this.loadMenuItems();
    }
  }

  captureID(itemId: number) {
    //console.log('Capture Id', itemId);
    if (this.menuItems) {
      this.menuItems.forEach((c) => {
        if (c.id == itemId) {
          this.image = c.imageUrl;
          //console.log('the image is ', this.image);
        }
      });
    }
  }

  getFilteredPagination(): (number | string)[] {
    if (this.itemsArray.length <= 9) {
      return this.itemsArray; // If the total pages are small, return all items
    }

    const start = this.itemsArray.slice(0, 6); // First 6 pages
    const end = this.itemsArray.slice(-3); // Last 3 pages

    if (this.currentPage <= 6 || this.currentPage >= this.totalPages - 2) {
      // No gap between currentPage and start or end
      return [...start, '...', ...end];
    } else {
      // Include the current page in the middle
      return [...start, '...', this.currentPage, '...', ...end];
    }
  }

  updateTitles() {
    this.MenuItems = this.languageService.MenuItems;
    this.AddItem = this.languageService.AddItem;
    this.Categories = this.languageService.Categories;
    this.language = this.languageService.getLanguage();
    this.loadCategories();
  }
}

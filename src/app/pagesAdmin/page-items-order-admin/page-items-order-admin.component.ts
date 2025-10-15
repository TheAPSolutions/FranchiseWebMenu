import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CategoryService } from '../../Services/category.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { ActivatedRoute } from '@angular/router';
import { DropdownAdminComponent } from '../../adminComponents/dropdown-admin/dropdown-admin.component';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-items-order-admin',
  templateUrl: './page-items-order-admin.component.html',
  styleUrl: './page-items-order-admin.component.scss',
})
export class PageItemsOrderAdminComponent implements OnInit {
  categories: { name: string; id: number }[] = [];
  private categoryService = inject(CategoryService);
  private menuItemsService = inject(MenuItemsServiceService);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute
  @ViewChild(DropdownAdminComponent)
  dropDownAdminComponent!: DropdownAdminComponent;

  selectedCategory?: getAllCategories;
  private notificationService = inject(NotificationService);

  Items!: MenuItem[];
  private languageService = inject(LanguageService);
  MenuItemsOrder: WritableSignal<string> = signal('');
  SelectCategory: WritableSignal<string> = signal('');
  language= 'En';


  ngOnInit(): void {
    this.loadCategories();

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;
      if (id !== null && !isNaN(id)) {
        this.onCategorySelect(id);
        this.categoryService.getSingleCategory(id).subscribe({
          next: (response) => {
            const categoryName = response.nameEn;
            this.dropDownAdminComponent.onChange(categoryName, id);
            this.dropDownAdminComponent.onClick();
          },
          error: (err) => {
            this.ErrorMessage();
          },
        });
      } else {
        //console.log("No valid 'id' parameter provided. Default behavior applied.");
        // Optionally, you can load a default category or handle as needed
      }
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  onCategorySelect(id: number) {
    //console.log('category id', id);
    this.categoryService.getcategory(id).subscribe({
      next: (response) => {
        this.selectedCategory = response;
        //console.log(response);
      },
      error: (err) => {
        this.ErrorMessage();
      },
    });

    this.menuItemsService.getAllItemByCategoryId(id).subscribe({
      next: (itemsResponse) => {
        this.Items = itemsResponse;
        //console.log('items by category', this.Items);
        this.Items.sort((a, b) => a.itemOrder - b.itemOrder);
      },
      error: (err) => {
        this.ErrorMessage();
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Items, event.previousIndex, event.currentIndex);
    // Update orderNumber based on new positions
    this.Items.forEach((item, index) => {
      item.itemOrder = index + 1;
    });

    // Sort the Categories array by orderNumber
    this.Items.sort((a, b) => a.itemOrder - b.itemOrder);
    // Debug: Print the sorted array to the console
    //console.log('Categories in order:', this.Items);
    // Save the new order to the server
    this.saveOrder();
  }
  header: any = null;

  getHeader(item: string) {
    this.header = item;
  }

  loadCategories() {

    if(this.language == 'En'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameEn, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.ErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    } else if(this.language == 'Ar'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameAr, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.ErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    } else if(this.language == 'Tr'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameTr, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.ErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    }

  }

  saveOrder() {
    this.menuItemsService.updateMenuItemOrder(this.Items).subscribe({
      next: (response) => {
        //console.log('Order saved successfully');
        this.showSuccessMessage();
      },
      error: (err) => {
        //console.error('Error saving order', err);
        this.showErrorMessage();
      },
    });
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage('Category Order Changed', 'success');
  }

  showErrorMessage() {
    this.notificationService.showMessage(
      'Failed To Change The Item Order',
      'danger'
    );
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  updateTitles(){
    this.MenuItemsOrder = this.languageService.MenuItemsOrder;
    this.SelectCategory = this.languageService.SelectCategory;
    this.language = this.languageService.getLanguage();
    this.loadCategories();
  }
}

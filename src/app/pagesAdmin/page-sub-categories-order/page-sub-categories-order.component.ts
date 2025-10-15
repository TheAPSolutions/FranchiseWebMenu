import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { OrderCategoryDTO } from '../../models/Categories Requests DTO/order-categories.model';
import { CategoryService } from '../../Services/category.service';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { SubCategoryService } from '../../Services/subcategory.service';
@Component({
  selector: 'app-page-sub-categories-order',
  templateUrl: './page-sub-categories-order.component.html',
  styleUrl: './page-sub-categories-order.component.scss'
})
export class PageSubCategoriesOrderComponent {
Categories!: OrderCategoryDTO[];
  subCategoryService = inject(SubCategoryService);
  private notificationService = inject(NotificationService);
  private languageService = inject(LanguageService);
  CategoryOrder: WritableSignal<string> = signal('');
  SubCategories: WritableSignal<string> = signal('');
  SubCategoriesLanguage: WritableSignal<string> = signal('');
  language = 'En';


  ngOnInit(): void {
    this.subCategoryService.getCategoryOrder().subscribe({
      next: (response) => {
        // Assign the response to Categories
        this.Categories = response;

        // Sort the Categories array by orderNumber
        this.Categories.sort((a, b) => a.orderNumber - b.orderNumber);
        // Debug: Print sorted categories to confirm order
        //console.log('Categories loaded and sorted:', this.Categories);
      },
      error: (err) => {
        //console.error('Error fetching category order:', err);
        this.ErrorMessage();
      },
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.Categories, event.previousIndex, event.currentIndex);

    // Update orderNumber based on new positions
    this.Categories.forEach((category, index) => {
      category.orderNumber = index + 1;
    });
    // Sort the Categories array by orderNumber
    this.Categories.sort((a, b) => a.orderNumber - b.orderNumber);
    // Debug: Print the sorted array to the console
    //console.log('Categories in order:', this.Categories);
    // Save the new order to the server
    this.saveOrder();
  }

  saveOrder() {
    this.subCategoryService.updateCategoryOrder(this.Categories).subscribe({
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
      'Failed To Change The Category Order',
      'danger'
    );
  }

  ErrorMessage() {
    this.notificationService.showMessage(
      'Failed Loading Data',
      'danger'
    );
  }

  updateTitles(){
    this.CategoryOrder = this.languageService.CategoryOrder;
    this.SubCategoriesLanguage = this.languageService.SubCategories;
    this.language = this.languageService.getLanguage();
    this.SubCategories = this.languageService.SubCategories;


  }
}

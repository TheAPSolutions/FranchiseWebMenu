import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { SubCategoryService } from '../../Services/subcategory.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-view-sub-category-menu-items-popup',
  templateUrl: './view-sub-category-menu-items-popup.component.html',
  styleUrl: './view-sub-category-menu-items-popup.component.scss',
})
export class ViewSubCategoryMenuItemsPopupComponent {
  subCategoryService = inject(SubCategoryService);
  languageService = inject(LanguageService);
  MenuItems!: MenuItem[];
  ChildrenCategories!: getAllCategories[];

  @Output() isVisible = new EventEmitter<boolean>();
  @Output() selectedCategories = new EventEmitter<number[]>();

  selectedSubCategoryIds: number[] = []; // Stores currently selected subcategories
  originalAssignedIds: number[] = []; // Stores originally assigned subcategories
  viewMenuItems: WritableSignal<string> = signal('');
  language = signal('En');

  @Input() subCategoryId!: number;

  ngOnInit(): void {
    this.loadCategories();
    this.updateTitles();
  }

  updateTitles() {
    this.viewMenuItems = this.languageService.viewMenuItems;
    this.language.set(this.languageService.getLanguage());
  }

  /**
   * Fetches all categories and the ones assigned to the parent category.
   */
  loadCategories() {
    // Get all available subcategories
    this.subCategoryService
      .getMenuItemsBySubCategoryId(this.subCategoryId)
      .subscribe({
        next: (response) => {
          this.MenuItems = response;
        },
        error: (err) => {
          //console.error('Error fetching subcategories:', err);
        },
      });
  }

  /**
   * Handles selection toggle for checkboxes.
   * If checked, add to selected list; if unchecked, remove it.
   */
  toggleSelection(subCategoryId: number, event: any): void {
    if (event.target.checked) {
      if (!this.selectedSubCategoryIds.includes(subCategoryId)) {
        this.selectedSubCategoryIds.push(subCategoryId);
      }
    } else {
      this.selectedSubCategoryIds = this.selectedSubCategoryIds.filter(
        (id) => id !== subCategoryId
      );
    }
  }

  /**
   * Submits the selection of subcategories to be assigned to the parent.
   */
  emitSelectedSubCategories(): void {}

  /**
   * Closes the popup window.
   */
  exitWindow() {
    this.isVisible.emit(false);
  }
}

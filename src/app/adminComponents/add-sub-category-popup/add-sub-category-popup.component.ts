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
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-add-sub-category-popup',
  templateUrl: './add-sub-category-popup.component.html',
  styleUrl: './add-sub-category-popup.component.scss',
})
export class AddSubCategoryPopupComponent {
  subCategoryService = inject(SubCategoryService);
  languageService = inject(LanguageService);
  subCategories!: getAllCategories[];
  ChildrenCategories!: getAllCategories[];

  @Output() isVisible = new EventEmitter<boolean>();
  @Output() selectedCategories = new EventEmitter<number[]>();

  selectedSubCategoryIds: number[] = []; // Stores currently selected subcategories
  originalAssignedIds: number[] = []; // Stores originally assigned subcategories

  @Input() parentId!: number;
  addSubCategory: WritableSignal<string> = signal('');
  Save: WritableSignal<string> = signal('');
  language = signal('En');

  ngOnInit(): void {
    this.loadCategories();
    this.language.set(this.languageService.getLanguage());
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.addSubCategory = this.languageService.addSubCategory;
    this.Save = this.languageService.Save;
    this.language.set(this.languageService.getLanguage());
  }

  /**
   * Fetches all categories and the ones assigned to the parent category.
   */
  loadCategories() {
    // Get all available subcategories
    this.subCategoryService.getAllCategoriesWithNoParent().subscribe({
      next: (response) => {
        this.subCategories = response;
      },
      error: (err) => {
        //console.error('Error fetching subcategories:', err);
      },
    });

    // Get subcategories already assigned to this parent
    this.subCategoryService.getSubByParentId(this.parentId).subscribe({
      next: (response) => {
        this.ChildrenCategories = response;
        this.originalAssignedIds = response.map((sub) => sub.id); // ✅ Store initially assigned IDs
        this.selectedSubCategoryIds = [...this.originalAssignedIds]; // ✅ Pre-check assigned subcategories
      },
      error: (err) => {
        //console.error('Error fetching assigned subcategories:', err);
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
  emitSelectedSubCategories(): void {
    const addedSubCategories = this.selectedSubCategoryIds.filter(
      (id) => !this.originalAssignedIds.includes(id)
    );
    const removedSubCategories = this.originalAssignedIds.filter(
      (id) => !this.selectedSubCategoryIds.includes(id)
    );

    //console.log('Added:', addedSubCategories);
    //console.log('Removed:', removedSubCategories);

    // ✅ Step 1: Assign the new subcategories to the parent
    if (addedSubCategories.length > 0) {
      this.subCategoryService
        .assignSubCategoryToParent(addedSubCategories, this.parentId)
        .subscribe({
          next: () => console.log('Subcategories assigned successfully'),
          error: (err) => console.error('Error assigning subcategories:', err),
        });
    }

    // ✅ Step 2: Remove parent from unchecked subcategories
    if (removedSubCategories.length > 0) {
      this.subCategoryService
        .removeSubCategoriesFromParent(removedSubCategories)
        .subscribe({
          next: () => {
            //console.log('Subcategories unassigned successfully');
          },
          error: (err) => {
            //console.error('Error unassigning subcategories:', err);
          },
        });
    }

    this.exitWindow();
  }

  /**
   * Closes the popup window.
   */
  exitWindow() {
    this.isVisible.emit(false);
  }
}

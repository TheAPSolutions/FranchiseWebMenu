import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  input,
  inject,
  Type,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Updatecategory } from '../../models/Categories Requests DTO/update-category.model';
import { UpdateCategoryImage } from '../../models/Categories Requests DTO/update-image-category.model';
import { NotificationService } from '../../Services/notification.service';
import { PercentageBoxComponent } from '../percentage-box/percentage-box.component';
import { LanguageService } from '../../Services/language.service';
import { SubCategoryService } from '../../Services/subcategory.service';

@Component({
  selector: 'app-sub-category-row',
  templateUrl: './sub-category-row.component.html',
  styleUrl: './sub-category-row.component.scss'
})
export class SubCategoryRowComponent {
  @Output() isVisible = new EventEmitter<boolean>(true);
  @Output() isChanged = new EventEmitter<boolean>(false);
  @Output() deleted = new EventEmitter<boolean>(false);
  @Output() updated = new EventEmitter<boolean>(false);
  @Output() changedVisibility = new EventEmitter<boolean>(false);
  @Output() percentageApplied = new EventEmitter<boolean>(false);
  @Output() errorMessage = new EventEmitter<string>();

  @Output() ID = new EventEmitter<number>();

  @ViewChild(PercentageBoxComponent)
  percentageComponent!: PercentageBoxComponent;

  subCategoryService = inject(SubCategoryService);
  private notificationService = inject(NotificationService);

  catImage = input.required<string>();
  NameEn = input.required<string>();
  NameAr = input.required<string>();
  NameTr = input.required<string>();
  id = input.required<number>();
  visible = input.required<boolean>();

  newNameEn?: string;
  newNameTr?: string;
  newNameAr?: string;
  imageModel: UpdateCategoryImage = { id: 0, image: undefined };

  private languageService = inject(LanguageService);
  CategoryNameAdmin: WritableSignal<string> = signal('');
  PercentagePrice: WritableSignal<string> = signal('');
  PercentageDiscountPrice: WritableSignal<string> = signal('');
  viewMenuItems: WritableSignal<string> = signal('');

  ToggleSubCategory = false;

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  Maximize() {
    this.isVisible.emit();
    this.ID.emit(this.id());
  }

  onSelectedImage(img: File) {
    this.imageModel.id = this.id();
    this.imageModel.image = img;

    this.subCategoryService.updateCategoryImage(this.imageModel).subscribe({
      next: (response) => {
        this.isChanged.emit(true);
        this.updated.emit(true);
      },
      error: (err) => {
        this.showErrorUpdate();
        //console.error('Error occurred while adding category:', err);
        if (err.error) {
          //console.error('Error details:', err.error);
        }
      },
    });
  }
  model: Updatecategory = { Type: '', Id: 0, Value: '' };
  // Method to handle Enter key press
  onEnter(field: string, newValue?: string) {
    this.model.Type = field;
    this.model.Id = this.id();
    this.model.Value = newValue;

    if (newValue) {
      this.subCategoryService.updateCategory(this.model).subscribe({
        next: (response) => {
          this.isChanged.emit(true);
          this.updated.emit(true);
        },
        error: (err) => {
          this.showErrorUpdate();
          //console.error('Error occurred while adding category:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    }
  }

  Delete() {
    this.subCategoryService.deleteCategory(this.id()).subscribe({
      next: (response) => {
        this.isChanged.emit(true);
        this.deleted.emit(true);
      },
      error: (err) => {
        this.showErrorDelete();
        //console.error('Error occurred while adding category:', err);
        if (err.error) {
          //console.error('Error details:', err.error);
        }
      },
    });
  }

  toggleVisibility() {
    this.subCategoryService.toggleVisiblity(this.id()).subscribe({
      next: (response) => {
        this.isChanged.emit(true);
        this.changedVisibility.emit(true);
      },
      error: (err) => {
        this.showErrorUpdate();
        //console.error('Failed to fetch menu items', err);
      },
    });
  }

  handleError(message: string) {
    this.errorMessage.emit(message);
  }

  handlepercentageApplied() {
    this.percentageApplied.emit();
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage(
      'Category Updates Successfully',
      'success'
    );
  }

  showErrorUpdate() {
    this.notificationService.showMessage('Failed To Update Category', 'danger');
  }

  showErrorDelete() {
    this.notificationService.showMessage('Failed To Delete Sub Category Remove The Menu Items First', 'danger');
  }

  showSuccessDelete() {
    this.notificationService.showMessage(
      'Category Has Been Deleted Successfully',
      'success'
    );
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  updateTitles() {
    this.CategoryNameAdmin = this.languageService.CategroyNameAdmin;
    this.PercentagePrice = this.languageService.PercentagePrice;
    this.PercentageDiscountPrice = this.languageService.PercentageDiscountPrice;
    this.viewMenuItems = this.languageService.viewMenuItems;
  }

  addSubCategory() {
    this.ToggleSubCategory = !this.ToggleSubCategory;
  }
}

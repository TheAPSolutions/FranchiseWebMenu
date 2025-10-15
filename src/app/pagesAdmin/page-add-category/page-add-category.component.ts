import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { addCategoryRequest } from '../../models/Categories Requests DTO/add-category-request.model';
import { CategoryService } from '../../Services/category.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { UploadImageComponent } from '../../adminComponents/upload-image/upload-image.component';
import { LanguageService } from '../../Services/language.service';
import { SubCategoryService } from '../../Services/subcategory.service';
import { CheckBoxComponent } from '../../adminComponents/check-box/check-box.component';
import { addSubCategoryRequest } from '../../models/SubCategoriesDTO/addSubCategoryDTO.model';

@Component({
  selector: 'app-page-add-category',
  templateUrl: './page-add-category.component.html',
  styleUrls: ['./page-add-category.component.scss'],
})
export class PageAddCategoryComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  @ViewChild('checkbox') checkbox!: CheckBoxComponent;

  model: addSubCategoryRequest;
  router = inject(Router);
  notificationService = inject(NotificationService);
  languageService = inject(LanguageService);
  //Lnaguage Variables
  CategroyNameAdmin: WritableSignal<string> = signal('');
  AddCategroy: WritableSignal<string> = signal('');
  isSubCategoryLanguage: WritableSignal<string> = signal('');

  isSubCategory = false;
  subCategoryService = inject(SubCategoryService);
  categories: { name: string; id: number }[] = [];
  language = 'En';
  selectedParentCategoryId: number | null = null;
  Categories: WritableSignal<string> = signal('');

  constructor(private categoryService: CategoryService) {
    this.model = {
      nameAr: '',
      nameEn: '',
      nameTr: '',
      CategoryImage: null,
      ParentCategoryId: null,
    };
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  onFormSubmit() {
    if (
      this.model.CategoryImage != null &&
      this.model.nameTr != '' &&
      this.model.nameEn != '' &&
      this.model.nameTr != ''
    ) {
      if (this.isSubCategory) {
        if (this.model.ParentCategoryId != null) {
          this.subCategoryService.addSubCategory(this.model).subscribe({
            next: (response) => {
              //console.log('Category added successfully:', response);
              this.showSuccessMessage();
              this.clearModel();
              this.uploadImageComponent.resetImage();
            },

            error: () => {
              this.showErrorMessage();
              //console.error("Error occurred while adding category:", err);
            },
          });
        } else {
          this.MessageRequiredField();
        }
      } else {
        this.categoryService.addCategory(this.model).subscribe({
          next: (response) => {
            //console.log('Category added successfully:', response);
            this.showSuccessMessage();
            this.clearModel();
            this.uploadImageComponent.resetImage();
          },
          error: (err) => {
            this.showErrorMessage();
            //console.error("Error occurred while adding category:", err);
            if (err.error) {
              //console.error("Error details:", err.error);
            }
          },
        });
        //console.log('Form submitted:', this.model);
      }
    } else {
      this.MessageRequiredField();
    }
  }

  onSelectedImage(img: File) {
    this.model.CategoryImage = img;
    //console.log("Selected image:", this.model.CategoryImage);
  }
  showSuccessMessage() {
    this.notificationService.showMessage(
      'Successfully Added Category',
      'success'
    );
  }

  MessageRequiredField() {
    this.notificationService.showMessage('Required Field is Empty', 'danger');
  }

  showErrorMessage() {
    this.notificationService.showMessage('Failed To Add Category', 'danger');
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  clearModel() {
    this.model = {
      nameAr: '',
      nameEn: '',
      nameTr: '',
      CategoryImage: null,
      ParentCategoryId: null,
    };
    this.isSubCategory = false;

    if (this.checkbox) {
      this.checkbox.resetCheckbox();
    }
  }

  updateTitles() {
    this.CategroyNameAdmin = this.languageService.CategroyNameAdmin;
    this.AddCategroy = this.languageService.AddCategroy;
    this.Categories = this.languageService.Categories;
    this.isSubCategoryLanguage = this.languageService.isSubCategory;
    this.language = this.languageService.getLanguage();
  }

  onSubCategoryChecked(isChecked: boolean) {
    this.isSubCategory = isChecked;
    //console.log('Is SubCategory:', isChecked);
    this.loadCategories();
  }

  loadCategories() {
    if (this.language == 'En') {
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
    } else if (this.language == 'Ar') {
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
    } else if (this.language == 'Tr') {
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

  onCategorySelect(id: number) {
    this.model.ParentCategoryId = id; // Save the selected category
  }
}

import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { AddMenuItemRequest } from '../../models/add-menuItem-request/add-menuItem-request.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { NotificationService } from '../../Services/notification.service';
import { CategoryService } from '../../Services/category.service';
import { UpdateItemImage } from '../../models/add-menuItem-request/update-item-image.model';
import { UploadImageComponent } from '../../adminComponents/upload-image/upload-image.component';
import { DropdownAdminComponent } from '../../adminComponents/dropdown-admin/dropdown-admin.component';
import { LanguageService } from '../../Services/language.service';
import { SubCategoryService } from '../../Services/subcategory.service';

@Component({
  selector: 'app-page-add-item',
  templateUrl: './page-add-item.component.html',
  styleUrl: './page-add-item.component.scss',
})
export class PageAddItemComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  @ViewChild(DropdownAdminComponent)
  dropDownAdminComponent!: DropdownAdminComponent;

  model: AddMenuItemRequest;
  categories: { name: string; id: number; type: string }[] = [];
  subCategories: { name: string; id: number; type: string }[] = [];

  private menuItemsService = inject(MenuItemsServiceService);
  private categoryService = inject(CategoryService);
  private subCategoryService = inject(SubCategoryService);
  private notificationService = inject(NotificationService);

  @Output() show = new EventEmitter<boolean>(true);
  @Output() ID = new EventEmitter<number>();
  imageModel: UpdateItemImage = { id: 0, image: undefined };
  resetDropdown: boolean = false;

  imgName?: string;
  CategoriesTitle = signal<string>('Select Category');

  private languageService = inject(LanguageService);
  Prices: WritableSignal<string> = signal('');
  ProductName: WritableSignal<string> = signal('');
  StudentPrice: WritableSignal<string> = signal('');
  SelectCategory: WritableSignal<string> = signal('');
  Discount: WritableSignal<string> = signal('');
  Description: WritableSignal<string> = signal('');
  AddItem: WritableSignal<string> = signal('');
  language = 'En';
  isSubCategory = false;

  constructor() {
    this.model = {
      NameAr: '',
      NameEn: '',
      NameTr: '',
      DescriptionAr: '',
      DescriptionTr: '',
      DescriptionEn: '',
      PriceAr: '',
      PriceEn: '',
      PriceTr: '',
      DiscountedPriceTr: '',
      DiscountedPriceAr: '',
      DiscountedPriceEn: '',
      StudentPrice: '',
      imageUrl: null,
      categoryId: '0',
    };
  }
  ngOnInit(): void {
    this.loadCategories();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }
  imge!: File;
  onFormSubmit() {
    if (
      this.model.NameAr != '' &&
      this.model.NameEn != '' &&
      this.model.NameTr != '' &&
      this.model.PriceTr != '' &&
      this.model.PriceEn != '' &&
      this.model.PriceAr != '' &&
      this.model.categoryId != '0'
    ) {
      //console.log(this.model, this.isSubCategory);
      this.menuItemsService.addMenuItem(this.model, this.isSubCategory).subscribe({
        next: (response) => {
          //console.log('Category added successfully:', response);
          this.showSuccessMessage();
          this.resetDropdown = true;
          this.uploadImageComponent.resetImage();
          this.clearModel();
          this.dropDownAdminComponent.resetSelection = true;
          this.dropDownAdminComponent.ngOnChanges();
        },
        error: (err) => {
          this.showErrorMessage();
          //console.error('Error occurred while adding category:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    } else {
      this.MessageRequiredField();
    }
  }

  loadCategories() {
    if (this.language == 'En') {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data.map((category) => ({
            name: category.nameEn,
            id: category.id,
            type: 'category', // ✅ Label as "category"
          }));
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    } else if (this.language == 'Tr') {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data.map((category) => ({
            name: category.nameTr,
            id: category.id,
            type: 'category',
          }));
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    } else if (this.language == 'Ar') {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data.map((category) => ({
            name: category.nameAr,
            id: category.id,
            type: 'category',
          }));
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    }
  
    if (this.language == 'En') {
      this.subCategoryService.getAllCategoriesWithParent().subscribe({
        next: (data) => {
          this.subCategories = data.map((subCategory) => ({
            name: subCategory.nameEn,
            id: subCategory.id,
            type: 'subcategory', // ✅ Label as "subcategory"
          }));
          this.categories = [...this.categories, ...this.subCategories]; // Merge lists
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    } else if (this.language == 'Tr') {
      this.subCategoryService.getAllCategoriesWithParent().subscribe({
        next: (data) => {
          this.subCategories = data.map((subCategory) => ({
            name: subCategory.nameTr,
            id: subCategory.id,
            type: 'subcategory',
          }));
          this.categories = [...this.categories, ...this.subCategories];
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    } else if (this.language == 'Ar') {
      this.subCategoryService.getAllCategoriesWithParent().subscribe({
        next: (data) => {
          this.subCategories = data.map((subCategory) => ({
            name: subCategory.nameAr,
            id: subCategory.id,
            type: 'subcategory',
          }));
          this.categories = [...this.categories, ...this.subCategories];
        },
        error: (err) => {
          this.showErrorMessage();
        },
      });
    }
  }
  
  Maximize() {
    this.show.emit();
  }

  onSelectedImage(img: File) {
    this.model.imageUrl = img;
    this.imgName = img.name;

    //console.log('selected image', img);
  }

  onCategorySelect(event: { id: number; type: string; name: string }) {
    if (event.type === 'subcategory') {
      //console.log('Selected Subcategory:', event.id);
      this.model.categoryId = event.id.toString(); // ✅ Store ID for subcategory
      this.isSubCategory = true;
    } else {
      //console.log('Selected Category:', event.id);
      this.model.categoryId = event.id.toString(); // ✅ Store ID for category
      this.isSubCategory = false;
    }
  }
  onFileSelected(event: any) {
    this.model.imageUrl = event.target.files[0];
    //console.log('Selected image:', this.model.imageUrl);
  }
  showErrorMessage() {
    this.notificationService.showMessage('Failed To Add Item', 'danger');
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }
  showSuccessMessage() {
    this.notificationService.showMessage('Successfully Item Added', 'success');
  }

  MessageRequiredField() {
    this.notificationService.showMessage('Required Field is Empty', 'danger');
  }

  clearModel() {
    //console.log('clear model');
    this.model = {
      NameAr: '',
      NameEn: '',
      NameTr: '',
      DescriptionAr: '',
      DescriptionTr: '',
      DescriptionEn: '',
      PriceAr: '',
      PriceEn: '',
      PriceTr: '',
      DiscountedPriceTr: '',
      DiscountedPriceAr: '',
      DiscountedPriceEn: '',
      StudentPrice: '',
      imageUrl: null,
      categoryId: '0',
    };
    //console.log('clear model' + this.model);

    this.CategoriesTitle.set('Select Category'); // Change the title after submit
    this.imgName = undefined; // Reset the image name
    this.model.imageUrl = null; // Reset the image URL
    this.count = 0;
    this.countIndirim = 0;
  }
  count = 0;
  countIndirim = 0;
  onPriceChange(language: string, value: string) {
    // Update the other fields when any price field changes
    if (this.count < 3) {
      if (language === 'Tr') {
        this.model.PriceEn = value; // Set PriceTr to the new value of PriceEn
        this.model.PriceAr = value; // Set PriceAr to the new value of PriceEn
        this.count++;
      } else if (language === 'En') {
        this.model.PriceEn = value; // Set PriceEn to the new value of PriceTr
      } else if (language === 'AR') {
        this.model.PriceAr = value; // Set PriceEn to the new value of PriceAr
      }
    }
  }
  onPriceIndirimChange(language: string, value: string) {
    // Update the other fields when any price field changes
    if (this.countIndirim < 3) {
      if (language === 'Tr') {
        this.model.DiscountedPriceAr = value; // Set PriceTr to the new value of PriceEn
        this.model.DiscountedPriceEn = value; // Set PriceAr to the new value of PriceEn
        this.countIndirim++;
      }
    }
  }

  updateTitles() {
    this.Prices = this.languageService.Prices;
    this.ProductName = this.languageService.ProductName;
    this.StudentPrice = this.languageService.StudentPrice;
    this.SelectCategory = this.languageService.SelectCategory;
    this.Discount = this.languageService.Discount;
    this.AddItem = this.languageService.AddItem;
    this.Description = this.languageService.Description;
    this.language = this.languageService.getLanguage();
    this.loadCategories();
  }
}
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { UpdatMenuItemRequest } from '../../models/add-menuItem-request/update-menuItem-request.model';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { CategoryService } from '../../Services/category.service';
import { UpdateItemImage } from '../../models/add-menuItem-request/update-item-image.model';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { SubCategoryService } from '../../Services/subcategory.service';

@Component({
  selector: 'app-item-row-admin',
  templateUrl: './item-row-admin.component.html',
  styleUrl: './item-row-admin.component.scss',
})
export class ItemRowAdminComponent implements OnInit {
  //Get Input for the item
  Id = input.required<number>();
  NameTr = input.required<string>();
  NameEn = input.required<string>();
  NameAr = input.required<string>();
  DescriptionTr = input.required<string>();
  DescriptionEn = input.required<string>();
  DescriptionAr = input.required<string>();
  PriceTr = input.required<number>();
  PriceEn = input.required<number>();
  PriceAr = input.required<number>();
  StudentPrice = input.required<number>();
  DiscountedPriceTr = input<number>();
  DiscountedPriceEn = input<number>();
  DiscountedPriceAr = input<number>();
  imageUrl = input<string>();
  ItemOrder = input<number>();
  numberOfTimesOrdered = input<number>();
  categoryId = input<string>();
  isVisible = input<boolean>();

  hasOptions = input<boolean>();
  menuHasOptions: boolean | undefined = false;

  //Variables for the logic
  hideController = signal<boolean>(true);
  selectedLanguageName = 'TR';
  selectedLanguageDescription = 'TR';
  deleteSuccess = output<void>();
  updateSucess = output<void>();
  @Output() show = new EventEmitter<boolean>(true);
  @Output() ID = new EventEmitter<number>();
  @Output() isChanged = new EventEmitter<boolean>(false);
  @Output() updated = new EventEmitter<boolean>(false);
  categoryTitle = signal<string>('Categories');

  imageModel: UpdateItemImage = { id: 0, image: undefined };

  //inject Services
  private saveSubject = new Subject<void>();
  private menuItemService = inject(MenuItemsServiceService);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  categories: { name: string; id: number; type: string }[] = [];
  subCategories: { name: string; id: number; type: string }[] = [];

  //Signals for updating the item
  newNameTr = signal<string>('');
  newNameEn = signal<string>('');
  newNameAr = signal<string>('');
  newDescriptionTr = signal<string>('');
  newDescriptionEn = signal<string>('');
  newDescriptionAr = signal<string>('');
  newPriceTr = signal<number>(0);
  newPriceAr = signal<number>(0);
  newPriceEn = signal<number>(0);
  newStudentPrice = signal<number>(0);
  newDiscountedPriceTr = signal<number>(0);
  newDiscountedPriceEn = signal<number>(0);
  newDiscountedPriceAr = signal<number>(0);
  newcategoryId = signal<string>('');
  newisVisible = signal<boolean>(true);
  category?: getAllCategories;
  newNumberOfTimesOrdered = signal<number>(0);

  private languageService = inject(LanguageService);
  ProductName: WritableSignal<string> = signal('');
  NumberOrder: WritableSignal<string> = signal('');
  StudentPriceLanguage: WritableSignal<string> = signal('');
  Category: WritableSignal<string> = signal('');
  Prices: WritableSignal<string> = signal('');
  Description: WritableSignal<string> = signal('');
  
  hasOptionsTitle:string = '';
  manageOptionsTitle:string = '';
  
  
  @Output() isManageOptions = new EventEmitter<[boolean, number]>(); // Tuple type

  language = this.languageService.getLanguage();
  subCategoryService = inject(SubCategoryService);
  isSubCategory = false;

  //Setting the values of the signals to the input
  ngOnInit(): void {
    this.menuHasOptions = this.hasOptions();
    this.categoryService
      .getSingleCategory(Number(this.categoryId()))
      .subscribe({
        next: (response) => {
          this.category = response;
          if (this.language == 'En') {
            this.categoryTitle.set(this.category.nameEn);
          } else if (this.language == 'Ar') {
            this.categoryTitle.set(this.category.nameAr);
          } else if (this.language == 'Tr') {
            this.categoryTitle.set(this.category.nameTr);
          }
          //console.log('category Title', this.categoryTitle());
        },
      });

    this.newNameTr.set(this.NameTr());
    this.newNameEn.set(this.NameEn());
    this.newNameAr.set(this.NameAr());
    this.newDescriptionTr.set(this.DescriptionTr());
    this.newDescriptionEn.set(this.DescriptionEn());
    this.newDescriptionAr.set(this.DescriptionAr());
    this.newPriceTr.set(this.PriceTr());
    this.newPriceEn.set(this.PriceEn());
    this.newPriceAr.set(this.PriceAr());
    this.newDiscountedPriceTr.set(this.DiscountedPriceTr() ?? 0);
    this.newDiscountedPriceEn.set(this.DiscountedPriceEn() ?? 0);
    this.newDiscountedPriceAr.set(this.DiscountedPriceAr() ?? 0);
    this.newStudentPrice.set(this.StudentPrice() ?? 0);
    this.newcategoryId.set(this.categoryId() ?? '');
    this.newisVisible.set(this.isVisible() ?? true);
    this.newNumberOfTimesOrdered.set(this.numberOfTimesOrdered() ?? 0);

    //console.log('image in item row ', this.imageUrl);

    this.loadCategories();

    // Subscribe to the saveSubject for debounced save calls
    this.saveSubject.pipe(debounceTime(1000)).subscribe(() => {});
    this.languageService.currentLanguage$.subscribe(() => {
      this.language = this.languageService.getLanguage();
      this.updateTitles();
    });
    //console.log(this.hasOptions());
  }

  //When changing an input and press enter save
  onInputChange(event: KeyboardEvent, id: number) {
    if (event.key === 'Enter') {
      this.updateMenuItem(id);
    }
  }

  //updating item
  updateMenuItem(id: number) {
    const updatedItem: UpdatMenuItemRequest = {
      NameTr: this.newNameTr(),
      NameEn: this.newNameEn(),
      NameAr: this.newNameAr(),
      DescriptionTr: this.newDescriptionTr(),
      DescriptionEn: this.newDescriptionEn(),
      DescriptionAr: this.newDescriptionAr(),
      PriceTr: this.newPriceTr().toString(),
      PriceEn: this.newPriceEn().toString(),
      PriceAr: this.newPriceAr().toString(),
      DiscountedPriceTr: this.newDiscountedPriceTr().toString(),
      DiscountedPriceEn: this.newDiscountedPriceEn().toString(),
      DiscountedPriceAr: this.newDiscountedPriceAr().toString(),
      StudentPrice: this.newStudentPrice().toString(),
      categoryId: this.newcategoryId().toString(),
      isVisible: this.newisVisible(),
      // Add other fields as necessary
    };
    //pass this object to the service
    if (id) {
      this.menuItemService
        .UpdateMenuItem(id, updatedItem, this.isSubCategory)
        .subscribe({
          next: (response) => {
            //console.log('update success');
            this.showSuccessMessage();
          },
          error: (err) => {
            //console.error('Failed to fetch menu items', err);
            this.ErrorMessage();
          },
        });
    }
  }

  Maximize() {
    this.show.emit();
    this.ID.emit(this.Id());
  }

  onSelectedImage(img: File) {
    this.imageModel.id = this.Id();
    this.imageModel.image = img;

    this.menuItemService.updateItemImage(this.imageModel).subscribe({
      next: (response) => {
        this.isChanged.emit(true);
        this.updateSucess.emit();
        this.showSuccessMessage();
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

  //Delete Item
  onDelete(id: number) {
    if (id) {
      this.menuItemService.deleteMenuItem(id).subscribe({
        next: (response) => {
          //console.log('Menu Item deleted successfuly');
          this.showSuccessDelete();
          this.deleteSuccess.emit();
        },
        error: (err) => {
          this.showErrorDelete();
        },
      });
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.map((category) => ({
          name:
            this.language === 'En'
              ? category.nameEn
              : this.language === 'Tr'
              ? category.nameTr
              : category.nameAr,
          id: category.id,
          type: 'category',
        }));

        // 🔹 Fetch subcategories *after* categories have loaded
        this.subCategoryService.getAllCategoriesWithParent().subscribe({
          next: (subData) => {
            this.subCategories = subData.map((subCategory) => ({
              name:
                this.language === 'En'
                  ? subCategory.nameEn
                  : this.language === 'Tr'
                  ? subCategory.nameTr
                  : subCategory.nameAr,
              id: subCategory.id,
              type: 'subcategory',
            }));

            this.categories = [...this.categories, ...this.subCategories];
          },
          error: (err) => {
            this.showErrorMessageSub();
          },
        });
      },
      error: (err) => {
        this.showErrorMessageParent();
      },
    });
  }


  onCategorySelect(event: { id: number; type: string; name: string }) {
    if (event.type === 'subcategory') {
      this.newcategoryId.set(event.id.toString());
      this.isSubCategory = true;
    } else {
      this.newcategoryId.set(event.id.toString());
      this.isSubCategory = false;
    }
    const updatedItem: UpdatMenuItemRequest = {
      NameTr: this.newNameTr(),
      NameEn: this.newNameEn(),
      NameAr: this.newNameAr(),
      DescriptionTr: this.newDescriptionTr(),
      DescriptionEn: this.newDescriptionEn(),
      DescriptionAr: this.newDescriptionAr(),
      PriceTr: this.newPriceTr().toString(),
      PriceEn: this.newPriceEn().toString(),
      PriceAr: this.newPriceAr().toString(),
      DiscountedPriceTr: this.newDiscountedPriceTr().toString(),
      DiscountedPriceEn: this.newDiscountedPriceEn().toString(),
      DiscountedPriceAr: this.newDiscountedPriceAr().toString(),
      isVisible: this.newisVisible(),
      categoryId: this.newcategoryId(),
    };

    //console.log('updated item', updatedItem);

    this.menuItemService
      .UpdateMenuItem(this.Id(), updatedItem, this.isSubCategory)
      .subscribe({
        next: (response) => {
          //console.log('update success');
          this.updateSucess.emit();
          this.showSuccessMessage();
        },
        error: (err) => {
          this.showErrorUpdate();
          //console.error('Failed to fetch menu items', err);
        },
      });

    //console.log('new category id is', this.newcategoryId);
  }

  //Select Language for the product name
  onNameLanguageSelect(language: string) {
    //console.log('selected language is' + language);
    this.selectedLanguageName = language;
  }

  //Select Language for the description
  onDescriptionLanguageSelect(language: string) {
    //console.log('selected language is' + language);
    this.selectedLanguageDescription = language;
  }

  //handle the icon change according to is visible value
  onIconClick(id: number) {
    this.newisVisible.set(!this.newisVisible()); // Toggle the value
    this.updateMenuItem(id);
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage(
      'Item Updates Successfully',
      'success'
    );
  }

  showErrorUpdate() {
    this.notificationService.showMessage('Failed To Update Item', 'danger');
  }

  showErrorDelete() {
    this.notificationService.showMessage('Failed To Delete Item', 'danger');
  }

  showSuccessDelete() {
    this.notificationService.showMessage(
      'Item Has Been Deleted Successfully',
      'success'
    );
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  updateTitles() {
    this.ProductName = this.languageService.ProductName;
    this.NumberOrder = this.languageService.NumberOrder;
    this.StudentPriceLanguage = this.languageService.StudentPrice;
    this.Category = this.languageService.Category;
    this.Prices = this.languageService.Prices;
    this.Description = this.languageService.Description;

    switch(this.languageService.getLanguage().toLowerCase()){
      case 'en':
        this.hasOptionsTitle = 'Has Options';
        this.manageOptionsTitle = 'Manage Options';
        break;
      case 'ar':
        this.hasOptionsTitle = 'لها اختيارات';
        this.manageOptionsTitle = 'إدارة الخيارات';
        break;
      case 'tr':
        this.hasOptionsTitle = 'Seçenekleri bulunmakta';
        this.manageOptionsTitle = 'Seçenekleri Yönet';
        break;
    }

  
  }
      
  onManageOptionsClicked(){
    this.isManageOptions.emit([true, this.Id()]);
  }
  toggleHasOptions(event: boolean){
    this.menuHasOptions = event;
    this.menuItemService.updateOptions(this.Id(), event).subscribe({
      next: (result) => {
        this.notificationService.showMessage(
          'hasOptions Changed Successfully',
          'success'
        );
      }
    });
  }

  showErrorMessage() {
    this.notificationService.showMessage('Failed To Add Item', 'danger');
  }
  showErrorMessageSub() {
    this.notificationService.showMessage('Failed To load sub', 'danger');
  }
  showErrorMessageParent() {
    this.notificationService.showMessage('Failed To load parents', 'danger');
  }

  MessageRequiredField() {
    this.notificationService.showMessage('Required Field is Empty', 'danger');
  }
}

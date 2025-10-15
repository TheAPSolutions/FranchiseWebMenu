import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { CategoryService } from '../../Services/category.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { SubCategoryService } from '../../Services/subcategory.service';
import { getSubCategory } from '../../models/SubCategoriesDTO/getSubCategoryDTO.model';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { MenuItemCardComponent } from '../../components/menu-item-card/menu-item-card.component';

@Component({
  selector: 'app-page-menu-items',
  templateUrl: './page-menu-items.component.html',
  styleUrl: './page-menu-items.component.scss',
})
export class PageMenuItemsComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('scrollItem') scrollItems!: QueryList<ElementRef>;

  notificationservice = inject(NotificationService);
  languageService = inject(LanguageService);
  categoryService = inject(CategoryService);

  menuSevice = inject(MenuItemsServiceService);

  categories?: getAllCategories[];
  menuItems?: MenuItem[];
  language = 'En';

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  title!: string;
  constructor(private route: ActivatedRoute) {}
  isLoading: boolean = true; // Loading state
  private subCategoryService = inject(SubCategoryService);
  hasSubcategories = false;
  subCategories?: getSubCategory[];
  queryParams?: { id: number };
  private router = inject(Router);

  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
          .filter((category) => category.visible === true) // Filter categories by visibility
          .sort((a, b) => b.ordernumber - a.ordernumber); // Sort by categoryOrder
      },
    });

    // Initialize titles based on the default language
    this.updateTitles();

    // Subscribe to query parameters
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id')); // Convert to number
      const FromSubCategory = params.has('FromSubCategory')
        ? params.get('FromSubCategory') === 'true'
        : false;
      //console.log('Product ID:', id);
      if (FromSubCategory) {
        this.subCategoryService.getcategory(id).subscribe({
          next: (response) => {
            // Subscribe to the currentLanguage$ observable
            this.languageService.currentLanguage$.subscribe(
              (currentLanguage) => {
                switch (currentLanguage) {
                  case 'En':
                    this.title = response.nameEn;
                    break; // Use break to exit the switch after a case matches
                  case 'Tr':
                    this.title = response.nameTr;
                    break;
                  case 'Ar':
                    this.title = response.nameAr;
                    break;
                  default:
                    this.title = response.nameEn; // Default to English or handle accordingly
                }
              }
            );
          },
        });
      } else {
        this.categoryService.getcategory(id).subscribe({
          next: (response) => {
            // Subscribe to the currentLanguage$ observable
            this.languageService.currentLanguage$.subscribe(
              (currentLanguage) => {
                switch (currentLanguage) {
                  case 'En':
                    this.title = response.nameEn;
                    break; // Use break to exit the switch after a case matches
                  case 'Tr':
                    this.title = response.nameTr;
                    break;
                  case 'Ar':
                    this.title = response.nameAr;
                    break;
                  default:
                    this.title = response.nameEn; // Default to English or handle accordingly
                }
              }
            );
          },
        });
      }

      // Fetch menu items by category ID

      if (FromSubCategory) {
        this.subCategoryService.getMenuItemsBySubCategoryId(id).subscribe({
          next: (response) => {
            this.menuItems = response;
            this.menuItems?.sort((a, b) => a.itemOrder - b.itemOrder);
            this.isLoading = false;
            //console.log("after sort: " , this.menuItems);
          },
          error: (err) => {
            //console.error('Error fetching menu items:', err);
          },
        });
      } else {
        this.menuSevice.getAllItemByCategoryId(id).subscribe({
          next: (response) => {
            this.menuItems = response;
            //console.log(this.menuItems);

            this.menuItems?.sort((a, b) => a.itemOrder - b.itemOrder);
            this.isLoading = false;
            //console.log("after sort: " , this.menuItems);
          },
        });
      }
    });
  }

  /*   ngAfterViewInit() {
    this.cdr.detectChanges();  // Ensure view is fully initialized
    setTimeout(() => {
      this.scrollToTop();
    }, 0);  // Delay by 0ms to wait for rendering completion
  } */

  private updateTitles() {
    // Update titles based on the current language in the service
    this.NavLeft = this.languageService.Home;
    this.NavRight = this.languageService.Cart;

    this.language = this.languageService.getLanguage();
  }

  showSuccessMessage() {
    if (this.language == 'En') {
      this.notificationservice.showMessage(
        'Successfully Added to cart',
        'success'
      );
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage('ürün sepete eklendi', 'success');
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage(
        'تم إضافة طلبكم إلى السلة',
        'success'
      );
    }
  }

  showDeleteMessage() {
    if (this.language == 'En') {
      this.notificationservice.showMessage('Item removed from cart', 'danger');
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage(
        'ürün sepetten çıkarılmış',
        'danger'
      );
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage('تم الحذف من السلة', 'danger');
    }
  }

  showWarningMessage() {
    if (this.language == 'En') {
      this.notificationservice.showMessage('Please Remove the item from the cart directly', 'warning');
    } else if (this.language == 'Tr') {
      this.notificationservice.showMessage(
        'Lütfen ürünü doğrudan sepetten kaldırın',
        'warning'
      );
    } else if (this.language == 'Ar') {
      this.notificationservice.showMessage('يرجى إزالة العنصر من سلة التسوق مباشرة', 'warning');
    }
  }

  checkSubcategories(parentId: number, item: any): void {
    this.subCategoryService.hasSubcategories(parentId).subscribe(
      (response) => {
        //console.log(response);
        if (response === false) {
          this.hasSubcategories = false;

          // No subcategories, go directly to menu items
          this.queryParams = { id: item.id };
          this.router.navigate(['/menu/menuItems'], {
            queryParams: this.queryParams,
          });
        } else {
          this.hasSubcategories = true;
          this.subCategories = response as getSubCategory[];

          // Has subcategories, go to subcategory page
          this.queryParams = { id: item.id };
          this.router.navigate(['/menu/subCategories'], {
            queryParams: { parentId: parentId },
            state: { subCategories: this.subCategories }, // ✅ Pass data via state
          });
        }
      },
      (error) => {
        //console.error('Error fetching subcategories:', error);
      }
    );
  }
  orderOptionsVisible:boolean = false;
  openOverlayParentID:number = 0;
  overlayOrder!:OrderModel ;  

  @ViewChildren('menuItemCard') menuItemCards!: QueryList<MenuItemCardComponent>;
  
  // Function to find a specific card by ID
  getMenuItemCard(id: number): MenuItemCardComponent | undefined {    
    return this.menuItemCards.toArray().find(card => {
      return card.id() === id;
    });
  }

  handleOrderOptionsOverlay(event:[boolean, number, OrderModel]){
    this.orderOptionsVisible = event[0];
    this.openOverlayParentID = event[1];
    this.overlayOrder = event[2];
  }

  handleOverlayClosed(event:[boolean, number, OrderModel]) {
    this.orderOptionsVisible = event[0];
    if (event[1]) {
      const card = this.getMenuItemCard(event[1]);
      if (card && card.counterComponent) {
        card.counterComponent.MinusClickedFromClose();
      }
    }
  }
}

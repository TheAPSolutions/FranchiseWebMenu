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
import { UpdateOffer } from '../../models/offers/update_offer.model';
import { OffersServiceService } from '../../Services/offers-service.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-offer-row-admin',
  templateUrl: './offer-row-admin.component.html',
  styleUrl: './offer-row-admin.component.scss',
})
export class OfferRowAdminComponent {
  //Get Input for the item
  Id = input.required<number>();
  DescriptionTr = input.required<string>();
  DescriptionEn = input.required<string>();
  DescriptionAr = input.required<string>();
  imageUrl = input<string>();
  offerOrder = input<number>();
  isVisible = input<boolean>();

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
  private offersService = inject(OffersServiceService);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  //Signals for updating the item
  newDescriptionTr = signal<string>('');
  newDescriptionEn = signal<string>('');
  newDescriptionAr = signal<string>('');
  newisVisible = signal<boolean>(true);
  category?: getAllCategories;

  private languageService = inject(LanguageService);
  Description: WritableSignal<string> = signal('');

  updateTitles() {
    this.Description = this.languageService.Description;
  }

  //Setting the values of the signals to the input
  ngOnInit(): void {
    this.newDescriptionTr.set(this.DescriptionTr());
    this.newDescriptionEn.set(this.DescriptionEn());
    this.newDescriptionAr.set(this.DescriptionAr());
    this.newisVisible.set(this.isVisible() ?? true);

    //console.log('image in item row ', this.imageUrl);

    // Subscribe to the saveSubject for debounced save calls
    this.saveSubject.pipe(debounceTime(1000)).subscribe(() => {});

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  //When changing an input and press enter save
  onInputChange(event: KeyboardEvent, id: number) {
    if (event.key === 'Enter') {
      this.updateOffer(id);
    }
  }

  //updating item
  updateOffer(id: number) {
    const updatedOffer: UpdateOffer = {
      DescriptionTr: this.newDescriptionTr(),
      DescriptionEn: this.newDescriptionEn(),
      DescriptionAr: this.newDescriptionAr(),
      isVisible: this.newisVisible(),
      // Add other fields as necessary
    };
    //pass this object to the service
    if (id) {
      this.offersService.UpdateOffer(id, updatedOffer).subscribe({
        next: (response) => {
          //console.log('update success');
          this.updateSucess.emit();
          this.updated.emit(true);
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

    this.offersService.updateOfferImage(this.imageModel).subscribe({
      next: (response) => {
        this.isChanged.emit(true);
        this.updated.emit(true);
      },
      error: (err) => {
        this.showErrorUpdate();
        if (err.error) {
        }
      },
    });
  }

  //Delete Item
  onDelete(id: number) {
    if (id) {
      this.offersService.deleteOffer(id).subscribe({
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

  //handle the icon change according to is visible value
  onIconClick(id: number) {
    this.newisVisible.set(!this.newisVisible()); // Toggle the value
    this.updateOffer(id);
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage(
      'Offer Updates Successfully',
      'success'
    );
  }

  showErrorUpdate() {
    this.notificationService.showMessage('Failed To Update Offer', 'danger');
  }

  showErrorDelete() {
    this.notificationService.showMessage('Failed To Delete Offer', 'danger');
  }

  showSuccessDelete() {
    this.notificationService.showMessage(
      'Offer Has Been Deleted Successfully',
      'danger'
    );
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }
}

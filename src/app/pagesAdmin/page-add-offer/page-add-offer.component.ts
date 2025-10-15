import {
  Component,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { addCategoryRequest } from '../../models/Categories Requests DTO/add-category-request.model';
import { CategoryService } from '../../Services/category.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { UploadImageComponent } from '../../adminComponents/upload-image/upload-image.component';
import { OffersServiceService } from '../../Services/offers-service.service';
import { AddOffer } from '../../models/offers/add_offer.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-add-offer',
  templateUrl: './page-add-offer.component.html',
  styleUrl: './page-add-offer.component.scss',
})
export class PageAddOfferComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;

  model: AddOffer;
  router = inject(Router);
  notificationService = inject(NotificationService);
  OfferService = inject(OffersServiceService);
  constructor() {
    this.model = {
      descriptionTr: '',
      descriptionEn: '',
      descriptionAr: '',
      imageUrl: null,
    };
  }

  private languageService = inject(LanguageService);
  AddOffer: WritableSignal<string> = signal('');
  Description: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.AddOffer = this.languageService.AddOffer;
    this.Description = this.languageService.Description;
  }

  onFormSubmit() {
    if (
      this.model.imageUrl != null &&
      this.model.descriptionTr != '' &&
      this.model.descriptionEn != '' &&
      this.model.descriptionAr != ''
    ) {
      this.OfferService.addOffer(this.model).subscribe({
        next: (response) => {
          //console.log('Category added successfully:', response);
          this.showSuccessMessage();
          this.clearModel();
          this.uploadImageComponent.resetImage();
        },
        error: (err) => {
          this.showErrorMessage();
          if (err.error) {
          }
        },
      });
    } else {
      this.MessageRequiredField();
    }
  }

  onSelectedImage(img: File) {
    this.model.imageUrl = img;
    //console.log("Selected image:", this.model.CategoryImage);
  }
  showSuccessMessage() {
    this.notificationService.showMessage('Successfully Added Offer', 'success');
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
      descriptionTr: '',
      descriptionEn: '',
      descriptionAr: '',
      imageUrl: null,
    };
  }
}

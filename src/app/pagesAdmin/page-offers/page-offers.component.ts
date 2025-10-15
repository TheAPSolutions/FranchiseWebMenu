import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { NotificationService } from '../../Services/notification.service';
import { CategoryService } from '../../Services/category.service';
import { OffersServiceService } from '../../Services/offers-service.service';
import { Offers } from '../../models/Offers Models/offers.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-offers',
  templateUrl: './page-offers.component.html',
  styleUrl: './page-offers.component.scss',
})
export class PageOffersComponent {
  private offerService = inject(OffersServiceService);
  private notificationService = inject(NotificationService);

  image!: string;
  itemsArray: number[] = [];
  isVisible: boolean = false;
  handleVisibility(id: boolean) {
    this.isVisible = !this.isVisible;
  }

  index = 0;
  // Pagination properties
  currentPage: number = 1; // Start on the first page
  pageSize: number = 10; // Number of items per page
  totalItems: number = 0; // Total number of items
  totalPages: number = 0; // Number of pages

  offers: Offers[] = [];

  private languageService = inject(LanguageService);
  AddOffer: WritableSignal<string> = signal('');
  Offers: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.loadOffers();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  loadOffers() {
    //console.log('Loading items for page:', this.currentPage); // Log the current page
    this.offerService
      .getAllOfferspaged(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          //console.log('Response received for page:', this.currentPage, response); // Log the API response
          this.offers = response.data;
          // Update menu items
          //console.log(response.data);
          //console.log(this.offers);
          this.totalItems = response.totalRecords; // Update total items
          this.totalPages = response.totalPages; // Update total pages
          this.itemsArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
        error: (err) => {
          //console.error('Failed to fetch menu items', err);
          this.notificationService.showMessage(err, 'danger');
        },
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      this.loadOffers(); // Load items for the new page
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement currentPage
      this.loadOffers(); // Load items for the new page
    }
  }

  onChange(chnaged: boolean) {
    this.ngOnInit();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadOffers(); // Reload items for the new page
  }

  showSuccessMessage() {
    this.notificationService.showMessage(
      'Successfully Deleted Item',
      'success'
    );
  }

  showSuccessUpdateMessage() {
    this.notificationService.showMessage(
      'Item Updated Successfully',
      'success'
    );
    this.loadOffers();
  }

  ErrorMessage() {
    this.notificationService.showMessage('Failed Loading Data', 'danger');
  }

  captureID(itemId: number) {
    if (this.offers) {
      this.offers.forEach((c) => {
        if (c.id == itemId) {
          this.image = c.imageUrl;
        }
      });
    }
  }

  updateTitles(){
    this.AddOffer = this.languageService.AddOffer;
    this.Offers = this.languageService.Offers;

  }
}

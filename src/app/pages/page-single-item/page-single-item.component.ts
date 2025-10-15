import { Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import { SingleMenuItem } from '../../models/Customer Order model/single-menu-item.model';
import { OrderModel } from '../../models/Customer Order model/order-model.model';
import { ItemInfoCardComponent } from '../../components/item-info-card/item-info-card.component';

@Component({
  selector: 'app-page-single-item',
  templateUrl: './page-single-item.component.html',
  styleUrl: './page-single-item.component.scss'
})
export class PageSingleItemComponent {
  notificationservice = inject(NotificationService);
  languageService = inject(LanguageService);
  route = inject(ActivatedRoute);

  menuService = inject(MenuItemsServiceService);

  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  id!:number;

  menuItem!: SingleMenuItem;

  language = this.languageService.getLanguage();


  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.route.queryParamMap.subscribe(params => {
     const id = Number(params.get('id'));
      //console.log(this.id);
    
      this.menuService.getMenuItem(id).subscribe({
        next: (response) => {
          this.menuItem = response;
        },
        error: (err) =>{
          //console.log("Error Fetching items", err);
        }
      });
    });



    // Initialize titles based on the default language
    this.updateTitles();
  }
  
    private updateTitles() {
    // Update titles based on the current language in the service
    this.language = this.languageService.getLanguage();
    this.NavLeft = this.languageService.Home;
    this.NavRight = this.languageService.Cart;
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

  
  
    OptionsOverlayVisible: boolean = false;
    OptionsOverlayorder:OrderModel = {
      itemId: 0,
      price: 0,
      takeawayprice: 0,
      hasOptions: false,
      drinkOption: 0,
      foodOption: 0,
      studentPrice: 0,
      amount: 0
    };

    @ViewChild('smenuItem') SinglemenuItem!: ItemInfoCardComponent;

    handleOpenOverlayOptions(event: [boolean, number, OrderModel]){ 
      this.OptionsOverlayVisible = event[0];
      this.OptionsOverlayorder = event[2];
    }


    handleOverlayClosed(event:[boolean, number, OrderModel]) {
      this.OptionsOverlayVisible = event[0];
      if (event[1]) {
        const card = this.SinglemenuItem;
        //console.log(card);
        if (card && card.counterComponent) {
          card.counterComponent.MinusClickedFromClose();
        }
      }
    }



}

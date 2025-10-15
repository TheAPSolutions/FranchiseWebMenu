import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  provideRouter,
  RouterLink,
  RouterOutlet,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
} from '@angular/common/http';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageCardComponent } from './components/language-card/language-card.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageLanguageComponent } from './pages/page-language/page-language.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderPageFoodCardComponent } from './components/order-page-food-card/order-page-food-card.component';
import { OrderCounterComponent } from './components/order-counter/order-counter.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { PageCategoriesComponent } from './pages/page-categories/page-categories.component';
import { PageMenuItemsComponent } from './pages/page-menu-items/page-menu-items.component';
import { CategoryCardMidComponent } from './components/category-card-mid/category-card-mid.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { ItemInfoCardComponent } from './components/item-info-card/item-info-card.component';
import { PageSingleItemComponent } from './pages/page-single-item/page-single-item.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NotesOverlayComponent } from './components/notes-overlay/notes-overlay.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { PrimaryHeaderComponent } from './components/primary-header/primary-header.component';
import { PageInfoComponent } from './pages/page-info/page-info.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { LanguageService } from './Services/language.service';
import { MenuLayoutComponent } from './layout-components/menu-layout/menu-layout.component';
import { adminModule } from './admin.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { PageRatingComponent } from './pages/page-rating/page-rating.component';
import { SucessOrderComponent } from './pages/sucess-order/sucess-order.component';
import { PageOrderTypeComponent } from './pages/page-order-type/page-order-type.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { PagePaymentSuccessComponent } from './pages/page-payment-success/page-payment-success.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PagePaymentMethodComponent } from './pages/page-payment-method/page-payment-method.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { ImageContainerArabicComponent } from './components/image-container-arabic/image-container-arabic.component';
import { PrimaryHeaderArabicComponent } from './components/primary-header-arabic/primary-header-arabic.component';
import { ButtonPrimaryArabicComponent } from './components/button-primary-arabic/button-primary-arabic.component';
import { PageSubCategoriesUsersComponent } from './pages/page-sub-categories-users/page-sub-categories-users.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderOptionsOverlayComponent } from './components/order-options-overlay/order-options-overlay.component';
import { OrderPhoneNumberComponent } from './components/order-phone-number/order-phone-number.component';
import { websiteModule } from './website.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PageChooseRestaurantComponent } from './pages/page-choose-restaurant/page-choose-restaurant.component';
import { RestaurantCardsComponent } from './components/restaurant-cards/restaurant-cards.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LanguageCardComponent,
    NavigationComponent,
    PageLanguageComponent,
    OrderPageFoodCardComponent,
    OrderPageComponent,
    OrderCounterComponent,
    ButtonPrimaryComponent,
    BackButtonComponent,
    CategoryCardComponent,
    PageCategoriesComponent,
    PageMenuItemsComponent,
    CategoryCardMidComponent,
    MenuItemCardComponent,
    NotesOverlayComponent,
    PageSingleItemComponent,
    ItemInfoCardComponent,
    ToggleButtonComponent,
    DropdownComponent,
    SucessOrderComponent,
    ImageContainerComponent,
    PrimaryHeaderComponent,
    PageInfoComponent,
    SuccessMessageComponent,
    MenuLayoutComponent,
    PageRatingComponent,
    PageOrderTypeComponent,
    PagePaymentComponent,
    PagePaymentSuccessComponent,
    LoadingComponent,
    PagePaymentMethodComponent,
    PhoneInputComponent,
    ImageContainerArabicComponent,
    PrimaryHeaderArabicComponent,
    ButtonPrimaryArabicComponent,
    OrderOptionsOverlayComponent,
    PageSubCategoriesUsersComponent,
    OrderPhoneNumberComponent,
    PageChooseRestaurantComponent,
    RestaurantCardsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    CdkDrag,
    FormsModule,
    RouterLink,
    adminModule,
    ZXingScannerModule,
    NgxChartsModule,
    websiteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideAnimationsAsync(),
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

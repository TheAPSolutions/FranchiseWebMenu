import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageLogInComponent } from './pagesAdmin/page-log-in/page-log-in.component';
import { CommonModule } from '@angular/common';
import {
  provideRouter,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrandNameComponent } from './components/brand-name/brand-name.component';
import { LogoCircleComponent } from './components/logo-circle/logo-circle.component';
import { MatSelectModule } from '@angular/material/select';
import { PageMenuListComponent } from './pagesAdmin/page-menu-list/page-menu-list.component';
import { AdminHeaderComponent } from './adminComponents/admin-header/admin-header.component';
import { NavigationAdminComponent } from './adminComponents/navigation-admin/navigation-admin.component';
import { AdminLayoutComponent } from './layout-components/admin-layout/admin-layout.component';
import { DropdownAdminComponent } from './adminComponents/dropdown-admin/dropdown-admin.component';
import { SearchAdminComponent } from './adminComponents/search-admin/search-admin.component';

import { ItemRowAdminComponent } from './adminComponents/item-row-admin/item-row-admin.component';
import { DropdownMiniAdminComponent } from './adminComponents/dropdown-mini-admin/dropdown-mini-admin.component';
import { PageAdminCategoriesComponent } from './pagesAdmin/page-admin-categories/page-admin-categories.component';
import { MenuListHeaderAdminComponent } from './adminComponents/menu-list-header-admin/menu-list-header-admin.component';
import { CatergoryRowComponentComponent } from './adminComponents/catergory-row-component/catergory-row-component.component';
import { CategoryUploadImageComponent } from './adminComponents/category-upload-image/category-upload-image.component';
import { PercentageBoxComponent } from './adminComponents/percentage-box/percentage-box.component';
import { PageNavigationComponent } from './adminComponents/page-navigation/page-navigation.component';
import { PageAddItemComponent } from './pagesAdmin/page-add-item/page-add-item.component';
import { SaveButtonComponent } from './adminComponents/save-button/save-button.component';
import { CategoriesHeaderAdminComponent } from './adminComponents/categories-header-admin/categories-header-admin.component';
import { SingleImageCategoriesComponent } from './adminComponents/single-image-categories/single-image-categories.component';
import { PageAddCategoryComponent } from './pagesAdmin/page-add-category/page-add-category.component';
import { PageItemsOrderAdminComponent } from './pagesAdmin/page-items-order-admin/page-items-order-admin.component';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { PageCategoriesOrderComponent } from './pagesAdmin/page-categories-order/page-categories-order.component';
import { PageExportMenuComponent } from './pagesAdmin/page-export-menu/page-export-menu.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule } from '@angular/forms';
import { UsernameInputComponent } from './components/username-input/username-input.component';
import { PageLogInCashierComponent } from './pagesCashier/page-log-in-cashier/page-log-in-cashier.component';
import { NavigationCashierComponent } from './cashierComponents/navigation-cashier/navigation-cashier.component';
import { PageOrdersCashierComponent } from './pagesCashier/page-orders-cashier/page-orders-cashier.component';
import { CashierLayoutComponent } from './layout-components/cashier-layout/cashier-layout.component';
import { ButtonCashierViewDetailsComponent } from './cashierComponents/button-cashier-view-details/button-cashier-view-details.component';
import { PageTodaysOrdersCashierComponent } from './pagesCashier/page-todays-orders-cashier/page-todays-orders-cashier.component';
import { PageOrdersHistoryCashierComponent } from './pagesCashier/page-orders-history-cashier/page-orders-history-cashier.component';
import { FilterDateCashierComponent } from './cashierComponents/filter-date-cashier/filter-date-cashier.component';
import { SingleOrderCashierComponent } from './pagesCashier/single-order-cashier/single-order-cashier.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';
import { AdminSuccessMessageComponent } from './adminComponents/admin-success-message/admin-success-message.component';
import { PageSavedSingleOrderCashierComponent } from './pagesCashier/page-saved-single-order-cashier/page-saved-single-order-cashier.component';
import { CashierHeaderComponent } from './cashierComponents/cashier-header/cashier-header.component';
import { UploadImageComponent } from './adminComponents/upload-image/upload-image.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { PageOffersComponent } from './pagesAdmin/page-offers/page-offers.component';
import { OfferRowAdminComponent } from './adminComponents/offer-row-admin/offer-row-admin.component';
import { PageAddOfferComponent } from './pagesAdmin/page-add-offer/page-add-offer.component';
import { OfferListHeaderAdminComponent } from './adminComponents/offer-list-header-admin/offer-list-header-admin.component';
import { ComparePricesComponent } from './components/compare-prices/compare-prices.component';
import { CheckBoxComponent } from './adminComponents/check-box/check-box.component';
import { AddSubCategoryPopupComponent } from './adminComponents/add-sub-category-popup/add-sub-category-popup.component';
import { DropdownAdminCategoriesComponent } from './adminComponents/dropdown-admin-categories/dropdown-admin-categories.component';
import { PageSubcategoriesComponent } from './pagesAdmin/page-subcategories/page-subcategories.component';
import { SubCategoryRowComponent } from './adminComponents/sub-category-row/sub-category-row.component';
import { ViewSubCategoryMenuItemsPopupComponent } from './adminComponents/view-sub-category-menu-items-popup/view-sub-category-menu-items-popup.component';
import { PageSubCategoriesOrderComponent } from './pagesAdmin/page-sub-categories-order/page-sub-categories-order.component';
import { TotalSoldItemsNumberComponent } from './dashboardComponents/total-sold-items-number/total-sold-items-number.component';
import { PageDashboardComponent } from './pagesAdmin/page-dashboard/page-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TotalBranchesCardComponent } from './dashboardComponents/total-branches-card/total-branches-card.component';
import { AdminDashboardLayoutComponent } from './layout-components/admin-dashboard-layout/admin-dashboard-layout.component';
import { DashboardHeaderComponent } from './dashboardComponents/dashboard-header/dashboard-header.component';
import { TotalOrdersComponent } from './dashboardComponents/total-orders/total-orders.component';
import { TotalSalesPermonthComponent } from './dashboardComponents/total-sales-permonth/total-sales-permonth.component';
import { Top5solditemsComponent } from './dashboardComponents/top5solditems/top5solditems.component';
import { SalesBetweenMonthsComponent } from './dashboardComponents/sales-between-months/sales-between-months.component';
import { SalesBetweenBranchesComponent } from './dashboardComponents/sales-between-branches/sales-between-branches.component';
import { CashierPaymentManagerComponent } from './dashboardComponents/cashier-payment-manager/cashier-payment-manager.component';
import { OnlinePaymentManagerComponent } from './dashboardComponents/online-payment-manager/online-payment-manager.component';
import { SalesPerformanceComponent } from './dashboardComponents/sales-performance/sales-performance.component';
import { ItemPerformancePerBranchComponent } from './dashboardComponents/item-performance-per-branch/item-performance-per-branch.component';
import { ManageMenuitemsOptionsOverlayComponent } from './adminComponents/manage-menuitems-options-overlay/manage-menuitems-options-overlay.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AdminLoadingComponent } from './adminComponents/admin-loading/admin-loading.component';
import { PageOrderReadyCashierComponent } from './pagesCashier/page-order-ready-cashier/page-order-ready-cashier.component';

@NgModule({
  declarations: [
    PageLogInComponent,
    BrandNameComponent,
    LogoCircleComponent,
    PageMenuListComponent,
    AdminHeaderComponent,
    NavigationAdminComponent,
    AdminLayoutComponent,
    DropdownAdminComponent,
    SearchAdminComponent,
    UploadImageComponent,
    ItemRowAdminComponent,
    DropdownMiniAdminComponent,
    PageAdminCategoriesComponent,
    MenuListHeaderAdminComponent,
    CatergoryRowComponentComponent,
    CategoryUploadImageComponent,
    PercentageBoxComponent,
    PageNavigationComponent,
    CategoriesHeaderAdminComponent,
    SingleImageCategoriesComponent,
    PageAddItemComponent,
    SaveButtonComponent,
    PageAddCategoryComponent,
    PageItemsOrderAdminComponent,
    PasswordInputComponent,
    UsernameInputComponent,
    PageCategoriesOrderComponent,
    PageExportMenuComponent,
    PageLogInCashierComponent,
    NavigationCashierComponent,
    PageOrdersCashierComponent,
    CashierLayoutComponent,
    ButtonCashierViewDetailsComponent,
    PageTodaysOrdersCashierComponent,
    PageOrdersHistoryCashierComponent,
    FilterDateCashierComponent,
    SingleOrderCashierComponent,
    LanguageDropdownComponent,
    AdminSuccessMessageComponent,
    PageSavedSingleOrderCashierComponent,
    CashierHeaderComponent,
    PageOffersComponent,
    OfferRowAdminComponent,
    PageAddOfferComponent,
    OfferListHeaderAdminComponent,
    ComparePricesComponent,
    ManageMenuitemsOptionsOverlayComponent,
    CheckBoxComponent,
    AdminLoadingComponent,
    CheckBoxComponent,
    AddSubCategoryPopupComponent,
    DropdownAdminCategoriesComponent,
    PageSubcategoriesComponent,
    SubCategoryRowComponent,
    ViewSubCategoryMenuItemsPopupComponent,
    PageSubCategoriesOrderComponent,
    TotalSoldItemsNumberComponent,
    PageDashboardComponent,
    TotalBranchesCardComponent,
    AdminDashboardLayoutComponent,
    DashboardHeaderComponent,
    TotalOrdersComponent,
    TotalSalesPermonthComponent,
    Top5solditemsComponent,
    SalesBetweenMonthsComponent,
    SalesBetweenBranchesComponent,
    CashierPaymentManagerComponent,
    OnlinePaymentManagerComponent,
    SalesPerformanceComponent,
    ItemPerformancePerBranchComponent,
    PageOrderReadyCashierComponent
  ],
  exports: [
    PageLogInComponent,
    RouterModule,
    BrandNameComponent,
    LogoCircleComponent,
    PageMenuListComponent,
    AdminHeaderComponent,
    NavigationAdminComponent,
    AdminLayoutComponent,
    DropdownAdminComponent,
    SearchAdminComponent,
    ItemRowAdminComponent,
    UploadImageComponent,
    DropdownMiniAdminComponent,
    PageAdminCategoriesComponent,
    MenuListHeaderAdminComponent,
    CatergoryRowComponentComponent,
    CategoryUploadImageComponent,
    PercentageBoxComponent,
    PageNavigationComponent,
    CategoriesHeaderAdminComponent,
    SingleImageCategoriesComponent,
    PageAddItemComponent,
    SaveButtonComponent,
    PageAddCategoryComponent,
    PageItemsOrderAdminComponent,
    PasswordInputComponent,
    UsernameInputComponent,
    PageCategoriesOrderComponent,
    PageExportMenuComponent,
    PageLogInCashierComponent,
    NavigationCashierComponent,
    PageOrdersCashierComponent,
    CashierLayoutComponent,
    SingleOrderCashierComponent,
    ButtonCashierViewDetailsComponent,
    PageTodaysOrdersCashierComponent,
    PageOrdersHistoryCashierComponent,
    FilterDateCashierComponent,
    LanguageDropdownComponent,
    AdminSuccessMessageComponent,
    PageSavedSingleOrderCashierComponent,
    CashierHeaderComponent,
    PageOffersComponent,
    OfferRowAdminComponent,
    PageAddOfferComponent,
    OfferListHeaderAdminComponent,
    ComparePricesComponent,
    ManageMenuitemsOptionsOverlayComponent,
    CheckBoxComponent,
    AdminLoadingComponent,
    CheckBoxComponent,
    AddSubCategoryPopupComponent,
    DropdownAdminCategoriesComponent,
    PageSubcategoriesComponent,
    SubCategoryRowComponent,
    ViewSubCategoryMenuItemsPopupComponent,
    TotalSoldItemsNumberComponent,
    PageDashboardComponent,
    TotalBranchesCardComponent,
    AdminDashboardLayoutComponent,
    DashboardHeaderComponent,
    TotalOrdersComponent,
    TotalSalesPermonthComponent,
    Top5solditemsComponent,
    SalesBetweenMonthsComponent,
    SalesBetweenBranchesComponent,
    CashierPaymentManagerComponent,
    OnlinePaymentManagerComponent,
    SalesPerformanceComponent,
    ItemPerformancePerBranchComponent,
    PageOrderReadyCashierComponent
    
  ],
  bootstrap: [],
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
    HttpClientModule,
    ImageCropperComponent,
    NgxChartsModule,
  ],
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
})
export class adminModule {}

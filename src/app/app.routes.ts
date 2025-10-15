import { Routes } from '@angular/router';
import { PageLanguageComponent } from './pages/page-language/page-language.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { PageCategoriesComponent } from './pages/page-categories/page-categories.component';
import { PageMenuItemsComponent } from './pages/page-menu-items/page-menu-items.component';
import { PageSingleItemComponent } from './pages/page-single-item/page-single-item.component';
import { PageInfoComponent } from './pages/page-info/page-info.component';
import { PageLogInComponent } from './pagesAdmin/page-log-in/page-log-in.component';
import { MenuLayoutComponent } from './layout-components/menu-layout/menu-layout.component';
import { AdminLayoutComponent } from './layout-components/admin-layout/admin-layout.component';
import { PageMenuListComponent } from './pagesAdmin/page-menu-list/page-menu-list.component';
import { PageAdminCategoriesComponent } from './pagesAdmin/page-admin-categories/page-admin-categories.component';
import { PageAddItemComponent } from './pagesAdmin/page-add-item/page-add-item.component';
import { PageAddCategoryComponent } from './pagesAdmin/page-add-category/page-add-category.component';
import { PageItemsOrderAdminComponent } from './pagesAdmin/page-items-order-admin/page-items-order-admin.component';
import { PageCategoriesOrderComponent } from './pagesAdmin/page-categories-order/page-categories-order.component';
import { PageExportMenuComponent } from './pagesAdmin/page-export-menu/page-export-menu.component';
import { CashierLayoutComponent } from './layout-components/cashier-layout/cashier-layout.component';
import { PageOrdersCashierComponent } from './pagesCashier/page-orders-cashier/page-orders-cashier.component';
import { PageLogInCashierComponent } from './pagesCashier/page-log-in-cashier/page-log-in-cashier.component';
import { PageTodaysOrdersCashierComponent } from './pagesCashier/page-todays-orders-cashier/page-todays-orders-cashier.component';
import { PageOrdersHistoryCashierComponent } from './pagesCashier/page-orders-history-cashier/page-orders-history-cashier.component';
import { SingleOrderCashierComponent } from './pagesCashier/single-order-cashier/single-order-cashier.component';
import { PageSavedSingleOrderCashierComponent } from './pagesCashier/page-saved-single-order-cashier/page-saved-single-order-cashier.component';
import { authGuard } from './core/guards/auth.guard';
import { authCashierGuard } from './core/guards/auth-cashier.guard';
import { PageOffersComponent } from './pagesAdmin/page-offers/page-offers.component';
import { PageAddOfferComponent } from './pagesAdmin/page-add-offer/page-add-offer.component';
import { PageRatingComponent } from './pages/page-rating/page-rating.component';
import { SucessOrderComponent } from './pages/sucess-order/sucess-order.component';
import { PageOrderTypeComponent } from './pages/page-order-type/page-order-type.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { PagePaymentSuccessComponent } from './pages/page-payment-success/page-payment-success.component';
import { PagePaymentMethodComponent } from './pages/page-payment-method/page-payment-method.component';
import { PageSubcategoriesComponent } from './pagesAdmin/page-subcategories/page-subcategories.component';
import { PageSubCategoriesOrderComponent } from './pagesAdmin/page-sub-categories-order/page-sub-categories-order.component';
import { PageSubCategoriesUsersComponent } from './pages/page-sub-categories-users/page-sub-categories-users.component';
import { PageDashboardComponent } from './pagesAdmin/page-dashboard/page-dashboard.component';
import { AdminDashboardLayoutComponent } from './layout-components/admin-dashboard-layout/admin-dashboard-layout.component';
import { PageOrderReadyCashierComponent } from './pagesCashier/page-order-ready-cashier/page-order-ready-cashier.component';
import { LayoutWebsiteComponent } from './website/website-layout/layout-website/layout-website.component';
import { HomeWebsiteComponent } from './website/website-pages/home-website/home-website.component';
import { CateringPageWebsiteComponent } from './website/website-pages/catering-page-website/catering-page-website.component';
import { AboutusPageWebsiteComponent } from './website/website-pages/aboutus-page-website/aboutus-page-website.component';
import { AllbranchesPageWebsiteComponent } from './website/website-pages/allbranches-page-website/allbranches-page-website.component';
import { TurkeybranchesPageWebsiteComponent } from './website/website-pages/turkeybranches-page-website/turkeybranches-page-website.component';
import { SaudibranchesPageWebsiteComponent } from './website/website-pages/saudibranches-page-website/saudibranches-page-website.component';
import { IraqbranchesPageWebsiteComponent } from './website/website-pages/iraqbranches-page-website/iraqbranches-page-website.component';
import { FranchiesPageWebsiteComponent } from './website/website-pages/franchies-page-website/franchies-page-website.component';
import { LandingPageBasktasWebisteComponent } from './website/website-pages/landing-page-basktas-webiste/landing-page-basktas-webiste.component';
import { LandingPageMaslakWebsiteComponent } from './website/website-pages/landing-page-maslak-website/landing-page-maslak-website.component';
import { LandingPageBatisehirWebsiteComponent } from './website/website-pages/landing-page-batisehir-website/landing-page-batisehir-website.component';
import { BlogsWebsiteComponent } from './website/website-pages/blogs-website/blogs-website.component';
import { BlogdetailWebsiteComponent } from './website/website-components/blogdetail-website/blogdetail-website.component';
import { PageChooseRestaurantComponent } from './pages/page-choose-restaurant/page-choose-restaurant.component';

export const routes: Routes = [
  {
    path: 'menu',
    component: MenuLayoutComponent,
    children: [
      { path: '', component: PageChooseRestaurantComponent },
      { path: 'languages', component: PageLanguageComponent },
      { path: 'order', component: OrderPageComponent },
      { path: 'categories', component: PageCategoriesComponent },
      { path: 'menuItems', component: PageMenuItemsComponent },
      { path: 'singleItem', component: PageSingleItemComponent },
      { path: 'sucessMessage', component: SucessOrderComponent },
      { path: 'info', component: PageInfoComponent },
      { path: 'rating', component: PageRatingComponent },
      { path: 'ordertype', component: PageOrderTypeComponent },
      { path: 'payment', component: PagePaymentComponent },
      { path: 'successPayment', component: PagePaymentSuccessComponent },
      { path: 'paymentMethod', component: PagePaymentMethodComponent },
      { path: 'subCategories', component: PageSubCategoriesUsersComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: PageLogInComponent },
      {
        path: 'logIn',
        component: PageLogInComponent,
        canActivate: [authGuard],
      },
      {
        path: 'menuList',
        component: PageMenuListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: PageAdminCategoriesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'addItem',
        component: PageAddItemComponent,
        canActivate: [authGuard],
      },
      {
        path: 'addCategory',
        component: PageAddCategoryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orderItems',
        component: PageItemsOrderAdminComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orderCategories',
        component: PageCategoriesOrderComponent,
        canActivate: [authGuard],
      },
      {
        path: 'exportMenu',
        component: PageExportMenuComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orderItems/:id',
        component: PageItemsOrderAdminComponent,
        canActivate: [authGuard],
      },
      {
        path: 'Offers',
        component: PageOffersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'addOffer',
        component: PageAddOfferComponent,
        canActivate: [authGuard],
      },
      {
        path: 'subCategories',
        component: PageSubcategoriesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orderSubCategories',
        component: PageSubCategoriesOrderComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'cashier',
    component: CashierLayoutComponent,
    children: [
      { path: '', component: PageLogInCashierComponent },
      {
        path: 'newOrders',
        component: PageOrdersCashierComponent,
        canActivate: [authCashierGuard],
      },
      {
        path: 'todaysOrders',
        component: PageTodaysOrdersCashierComponent,
        canActivate: [authCashierGuard],
      },
      {
        path: 'ordersHistory',
        component: PageOrdersHistoryCashierComponent,
        canActivate: [authCashierGuard],
      },
      {
        path: 'singleOrder/:id/:tableNumber/:createdAt',
        component: SingleOrderCashierComponent,
        canActivate: [authCashierGuard],
      },
      {
        path: 'singleOrderSaved/:id/:tableNumber/:createdAt',
        component: PageSavedSingleOrderCashierComponent,
        canActivate: [authCashierGuard],
      },
      {
        path: 'readyOrders',
        component: PageOrderReadyCashierComponent,
        canActivate: [authCashierGuard],
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminDashboardLayoutComponent,
    children: [{ path: '', component: PageDashboardComponent }],
  },

  {
    path: '',
    component: LayoutWebsiteComponent,
    children: [
      { path: '', component: HomeWebsiteComponent },
      { path: 'besiktas', component: LandingPageBasktasWebisteComponent },
      { path: 'maslak', component: LandingPageMaslakWebsiteComponent },
      { path: 'batisehir', component: LandingPageBatisehirWebsiteComponent },
      { path: 'catering', component: CateringPageWebsiteComponent },
      { path: 'aboutus', component: AboutusPageWebsiteComponent },
      { path: 'allbranches', component: AllbranchesPageWebsiteComponent },
      {
        path: 'turkiyebranches',
        component: TurkeybranchesPageWebsiteComponent,
      },
      {
        path: 'saudiarabiabranches',
        component: SaudibranchesPageWebsiteComponent,
      },
      {
        path: 'iraqbranches',
        component: IraqbranchesPageWebsiteComponent,
      },
      {
        path: 'franchies',
        component: FranchiesPageWebsiteComponent,
      },
      {
        path: 'blogs',
        component: BlogsWebsiteComponent,
      },
      {
        path: 'blog/:slug',
        component: BlogdetailWebsiteComponent,
      },
    ],
  },
];

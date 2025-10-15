import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutWebsiteComponent } from './website/website-layout/layout-website/layout-website.component';
import { HeaderWebsiteComponent } from './website/website-components/header-website/header-website.component';
import { HeroWebsiteComponent } from './website/website-components/hero-website/hero-website.component';
import { HomeWebsiteComponent } from './website/website-pages/home-website/home-website.component';
import { SandwichesWebsiteComponent } from './website/website-components/sandwiches-website/sandwiches-website.component';
import { SloganWebsiteComponent } from './website/website-components/slogan-website/slogan-website.component';
import { FooterWebsiteComponent } from './website/website-components/footer-website/footer-website.component';
import { CateringWebsiteComponent } from './website/website-components/catering-website/catering-website.component';
import { CateringPageWebsiteComponent } from './website/website-pages/catering-page-website/catering-page-website.component';
import { AboutussWebsiteComponent } from './website/website-components/aboutuss-website/aboutuss-website.component';
import { AboutusPageWebsiteComponent } from './website/website-pages/aboutus-page-website/aboutus-page-website.component';
import { AllbranchesWebsiteComponent } from './website/website-components/allbranches-website/allbranches-website.component';
import { AllbranchesPageWebsiteComponent } from './website/website-pages/allbranches-page-website/allbranches-page-website.component';
import { TurkeybranchesWebsiteComponent } from './website/website-components/turkeybranches-website/turkeybranches-website.component';
import { TurkeybranchesPageWebsiteComponent } from './website/website-pages/turkeybranches-page-website/turkeybranches-page-website.component';
import { SaudibranchesPageWebsiteComponent } from './website/website-pages/saudibranches-page-website/saudibranches-page-website.component';
import { SaudibranchesWebsiteComponent } from './website/website-components/saudibranches-website/saudibranches-website.component';
import { IraqbranchesWebsiteComponent } from './website/website-components/iraqbranches-website/iraqbranches-website.component';
import { IraqbranchesPageWebsiteComponent } from './website/website-pages/iraqbranches-page-website/iraqbranches-page-website.component';
import { FranchiesWebsiteComponent } from './website/website-components/franchies-website/franchies-website.component';
import { FranchiesPageWebsiteComponent } from './website/website-pages/franchies-page-website/franchies-page-website.component';
import { ContactformWebsiteComponent } from './website/website-components/contactform-website/contactform-website.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from './animate-on-scroll.directive';
import { SeodiscriptionComponent } from './website/website-components/seodiscription/seodiscription.component';
import { DeliveryWebsiteComponent } from './website/website-components/delivery-website/delivery-website.component';
import { BlogsWebsiteComponent } from './website/website-pages/blogs-website/blogs-website.component';
import { BlogdetailWebsiteComponent } from './website/website-components/blogdetail-website/blogdetail-website.component';
import { CtaButtonWebsiteComponent } from './website/website-components/cta-button-website/cta-button-website.component';
import { LandingPageBasktasWebisteComponent } from './website/website-pages/landing-page-basktas-webiste/landing-page-basktas-webiste.component';
import { ImageCarouselComponent } from './website/website-components/image-carousel/image-carousel.component';
import { LandingPageMaslakWebsiteComponent } from './website/website-pages/landing-page-maslak-website/landing-page-maslak-website.component';
import { LandingPageBatisehirWebsiteComponent } from './website/website-pages/landing-page-batisehir-website/landing-page-batisehir-website.component';
import { BoxesLayoutComponent } from './website/website-components/boxes-layout/boxes-layout.component';

@NgModule({
  declarations: [
    LayoutWebsiteComponent,
    HeaderWebsiteComponent,
    HeroWebsiteComponent,
    HomeWebsiteComponent,
    SandwichesWebsiteComponent,
    SloganWebsiteComponent,
    FooterWebsiteComponent,
    CateringWebsiteComponent,
    CateringPageWebsiteComponent,
    AboutussWebsiteComponent,
    AboutusPageWebsiteComponent,
    AllbranchesWebsiteComponent,
    AllbranchesPageWebsiteComponent,
    TurkeybranchesWebsiteComponent,
    TurkeybranchesPageWebsiteComponent,
    SaudibranchesPageWebsiteComponent,
    SaudibranchesWebsiteComponent,
    IraqbranchesWebsiteComponent,
    IraqbranchesPageWebsiteComponent,
    FranchiesWebsiteComponent,
    FranchiesPageWebsiteComponent,
    ContactformWebsiteComponent,
    AnimateOnScrollDirective,
    SeodiscriptionComponent,
    DeliveryWebsiteComponent,
    BlogsWebsiteComponent,
    BlogdetailWebsiteComponent,
    CtaButtonWebsiteComponent,
    LandingPageBasktasWebisteComponent,
    ImageCarouselComponent,
    LandingPageMaslakWebsiteComponent,
    LandingPageBatisehirWebsiteComponent,
    BoxesLayoutComponent,
  ],
  exports: [
    LayoutWebsiteComponent,
    HeaderWebsiteComponent,
    HeroWebsiteComponent,
    HomeWebsiteComponent,
    SandwichesWebsiteComponent,
    SloganWebsiteComponent,
    FooterWebsiteComponent,
    CateringWebsiteComponent,
    CateringPageWebsiteComponent,
    AboutussWebsiteComponent,
    AboutusPageWebsiteComponent,
    AllbranchesWebsiteComponent,
    AllbranchesPageWebsiteComponent,
    TurkeybranchesWebsiteComponent,
    TurkeybranchesPageWebsiteComponent,
    SaudibranchesPageWebsiteComponent,
    SaudibranchesWebsiteComponent,
    IraqbranchesWebsiteComponent,
    IraqbranchesPageWebsiteComponent,
    FranchiesWebsiteComponent,
    FranchiesPageWebsiteComponent,
    ContactformWebsiteComponent,
    SeodiscriptionComponent,
    DeliveryWebsiteComponent,
    CtaButtonWebsiteComponent,
    LandingPageBasktasWebisteComponent,
    ImageCarouselComponent,
    LandingPageMaslakWebsiteComponent,
    LandingPageBatisehirWebsiteComponent,
    BoxesLayoutComponent,
  ],
  bootstrap: [],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
})
export class websiteModule {}

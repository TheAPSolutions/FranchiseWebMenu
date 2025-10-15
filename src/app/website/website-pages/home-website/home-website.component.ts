import { Component } from '@angular/core';
import { websiteModule } from '../../../website.module';
import { FooterWebsiteComponent } from '../../website-components/footer-website/footer-website.component';
import { Meta, Title } from '@angular/platform-browser';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Panel = {
  titleKey: string;
  level: 'h1' | 'h2' | 'h3';
  descriptionKey: string;
};

@Component({
  selector: 'app-home-website',
  templateUrl: './home-website.component.html',
  styleUrl: './home-website.component.scss',
})
export class HomeWebsiteComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private websiteLang: WebsiteLanguageService
  ) {}

  panels: Panel[] = [
    {
      titleKey: 'seo.panels.0.title',
      level: 'h1',
      descriptionKey: 'seo.panels.0.description',
    },
    {
      titleKey: 'seo.panels.1.title',
      level: 'h2',
      descriptionKey: 'seo.panels.1.description',
    },
    {
      titleKey: 'seo.panels.2.title',
      level: 'h3',
      descriptionKey: 'seo.panels.2.description',
    },
    {
      titleKey: 'seo.panels.3.title',
      level: 'h3',
      descriptionKey: 'seo.panels.3.description',
    },
    {
      titleKey: 'seo.panels.4.title',
      level: 'h2',
      descriptionKey: 'seo.panels.4.description',
    },
  ];

  ngOnInit(): void {
    const lang = this.websiteLang.getCurrentLang();

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16656032292/e05_CJTD2sQaEKTEm4Y-',
      });
    }

    if (lang === 'tr') {
      this.titleService.setTitle(
        'Beşiktaş’ta En İyi Burgerci – Taze, Lezzetli ve Özel Tariflerle'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'Beşiktaş’ta en iyi burgerci olarak taze malzemeler, el yapımı ekmekler ve özel tariflerle hazırladığımız burgerleri sizlerle buluşturuyoruz. Burger keyfi için hemen gelin!',
      });
    } else if (lang === 'en') {
      this.titleService.setTitle(
        'Best Burger in Beşiktaş – Fresh, Delicious, and Unique Recipes'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'As the best burger place in Beşiktaş, we bring you burgers prepared with fresh ingredients, homemade buns, and special recipes. Come and enjoy the ultimate burger experience!',
      });
    } else if (lang === 'ar') {
      this.titleService.setTitle(
        'أفضل برغر في بشيكتاش – وصفات طازجة، لذيذة، وفريدة من نوعها'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'باعتبارنا أفضل مطعم برغر في بشيكتاش، نقدم لكم برغر محضَّر بمكونات طازجة، وخبز منزلي الصنع، ووصفات خاصة. تعالوا واستمتعوا بأفضل تجربة برغر على الإطلاق!',
      });
    }
  }
}

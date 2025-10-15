import { Component } from '@angular/core';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutuss-website',
  templateUrl: './aboutuss-website.component.html',
  styleUrl: './aboutuss-website.component.scss',
  animations: [
    trigger('fadeInFromLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
    trigger('fadeInFromRight', [
      state('hidden', style({ opacity: 0, transform: 'translateX(50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
    trigger('fadeInDown', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
  ],
})
export class AboutussWebsiteComponent {
  currentLang: string = 'tr';
  imagePath: string = '';
  langSubscription: Subscription | undefined;

  constructor(
    private langService: WebsiteLanguageService,
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta,
    private websiteLang: WebsiteLanguageService
  ) {}

  animationStates: { [key: string]: 'visible' | 'hidden' } = {};
  private animationTimers: { [key: string]: any } = {};

  getAnimationState(id: string): 'visible' | 'hidden' {
    return this.animationStates[id] || 'hidden';
  }

  // Set animation state for an element
  setAnimationState(
    id: string,
    state: 'visible' | 'hidden',
    delay: number = 0
  ): void {
    if (state === 'visible' && delay > 0) {
      // Clear any existing timer for this element
      if (this.animationTimers[id]) {
        clearTimeout(this.animationTimers[id]);
      }

      // Set the animation after the specified delay
      this.animationTimers[id] = setTimeout(() => {
        this.animationStates[id] = state;
      }, delay);
    } else {
      // Immediate animation with no delay
      this.animationStates[id] = state;
    }
  }

  ngOnInit(): void {
    this.currentLang = this.langService.getCurrentLang();
    this.imagePath = this.getImagePathByLang(this.currentLang);

    // Subscribe to language changes
    this.langSubscription = this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.imagePath = this.getImagePathByLang(this.currentLang);
    });

    const lang = this.websiteLang.getCurrentLang();

    if (lang === 'tr') {
      this.titleService.setTitle(
        'Beşiktaş’ta Fast Food Deneyimini Zirveye Taşıyan Burgerci'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'Beşiktaş’ta en iyi burgerci olma yolunda çıktığımız bu lezzet serüveni, taze ve kaliteli malzemelerle hazırlanan özel tariflerimizle devam ediyor. Müşterilerimize sadece bir yemek değil, unutulmaz bir burger deneyimi sunmayı misyon edindik.',
      });
    } else if (lang === 'en') {
      this.titleService.setTitle('Quality & Affordable Catering Services');
      this.metaService.updateTag({
        name: 'description',
        content:
          'Our journey to become the best burger place in Beşiktaş continues with fresh, high-quality ingredients and unique recipes. Our mission is to offer not just a meal, but an unforgettable burger experience."',
      });
    } else if (lang === 'ar') {
      this.titleService.setTitle(
        'أفضل برغر في بشيكتاش – تجربة طعام سريعة لا تُنسى'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'رحلتنا لنصبح أفضل مطعم برغر في بشيكتاش مستمرة من خلال مكونات طازجة وعالية الجودة ووصفات فريدة. مهمتنا هي أن نقدّم لعملائنا ليس مجرد وجبة، بل تجربة برغر لا تُنسى.',
      });
    }
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe(); // prevent memory leaks
    Object.values(this.animationTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  }

  getImagePathByLang(lang: string): string {
    switch (lang) {
      case 'en':
        return 'images/website-images/aboutus3.webp';
      case 'ar':
        return 'images/website-images/aboutus4.webp';
      case 'tr':
      default:
        return 'images/website-images/aboutus2.webp';
    }
  }
}

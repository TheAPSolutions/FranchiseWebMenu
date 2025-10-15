import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';
@Component({
  selector: 'app-catering-website',
  templateUrl: './catering-website.component.html',
  styleUrl: './catering-website.component.scss',
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
export class CateringWebsiteComponent {
  animationStates: { [key: string]: 'visible' | 'hidden' } = {};
  private animationTimers: { [key: string]: any } = {};


  constructor(
    private titleService: Title,
    private metaService: Meta,
    private websiteLang: WebsiteLanguageService
  ) {}

  ngOnInit(): void {
    const lang = this.websiteLang.getCurrentLang();

    if (lang === 'tr') {
      this.titleService.setTitle('Kaliteli ve Uygun Fiyatlı Catering Hizmetleri');
      this.metaService.updateTag({
        name: 'description',
        content: 'Beşiktaş’ta kaliteli ve uygun fiyatlı catering hizmetleri. Taze menüler, esnek paketler ve profesyonel ekip.'
      });
    } else if (lang === 'en') {
      this.titleService.setTitle('Quality & Affordable Catering Services');
      this.metaService.updateTag({
        name: 'description',
        content: 'Quality and affordable catering services in Beşiktaş. Fresh menus, flexible packages, and professional service for your events.'
      });
    } else if (lang === 'ar') {
      this.titleService.setTitle('خدمات تقديم طعام عالية الجودة وبأسعار مناسبة');
      this.metaService.updateTag({
        name: 'description',
        content: 'خدمات تقديم طعام عالية الجودة وبأسعار مناسبة في بشيكتاش. قوائم طازجة، باقات مرنة وخدمة احترافية لمناسباتكم.'
      });
    }
  }

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
  ngOnDestroy(): void {
    Object.values(this.animationTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  }
}

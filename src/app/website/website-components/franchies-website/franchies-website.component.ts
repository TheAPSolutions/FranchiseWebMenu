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
  selector: 'app-franchies-website',
  templateUrl: './franchies-website.component.html',
  styleUrl: './franchies-website.component.scss',
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
export class FranchiesWebsiteComponent {
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
      this.titleService.setTitle(
        'Lezzetli Burger Franchise Sistemi ile İşinizi Büyütün'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'Beşiktaş’ta başlayan lezzet yolculuğumuzu franchise sistemiyle büyütüyoruz. Burger franchise fırsatlarımızla eğitim, pazarlama ve işletme desteği sunuyoruz.',
      });
    } else if (lang === 'en') {
      this.titleService.setTitle(
        'Grow Your Business with Our Delicious Burger Franchise System'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'We are expanding our delicious journey from Beşiktaş with our franchise system. Join our burger franchise and benefit from training, marketing, and operational support.',
      });
    } else if (lang === 'ar') {
      this.titleService.setTitle(
        'نمِّ عملك مع نظام الامتياز الخاص ببرغرنا الشهي'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'نوسع رحلتنا الشهية التي بدأت في بشيكتاش من خلال نظام الامتياز. انضم إلى امتياز البرغر الخاص بنا واستفد من التدريب والدعم التسويقي والتشغيلي.',
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

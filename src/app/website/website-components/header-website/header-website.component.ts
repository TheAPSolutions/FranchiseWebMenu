import { Component, inject, signal } from '@angular/core';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header-website',
  templateUrl: './header-website.component.html',
  styleUrl: './header-website.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateX(120%)', zIndex: '100' }),
        animate(
          '1s ease-in',
          style({ transform: 'translateX(0%)', zIndex: '100' })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('1s ease-in', style({ transform: 'translateX(120%)' })),
      ]),
    ]),
    trigger('fadeInDown', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
  ],
})
export class HeaderWebsiteComponent {
  isMenuOpen = signal<boolean>(false);
  isLanguageOpen = signal<boolean>(false);
  languageService = inject(WebsiteLanguageService);
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
  ngOnDestroy(): void {
    Object.values(this.animationTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  }

  OnToggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
  OnToggleLanguage() {
    this.isLanguageOpen.set(!this.isLanguageOpen());
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
  }

  switchLanguage(lang: string) {
    this.languageService.switchLanguage(lang);
    this.OnToggleLanguage();
  }
}

import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-footer-website',
  templateUrl: './footer-website.component.html',
  styleUrl: './footer-website.component.scss',
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
export class FooterWebsiteComponent {
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
  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}

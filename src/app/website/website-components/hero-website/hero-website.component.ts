import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-website',
  templateUrl: './hero-website.component.html',
  styleUrl: './hero-website.component.scss',
  animations: [
    trigger('fadeInFromLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
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
export class HeroWebsiteComponent {
  animationStates: { [key: string]: 'visible' | 'hidden' } = {};

  getAnimationState(id: string): 'visible' | 'hidden' {
    return this.animationStates[id] || 'hidden';
  }

  // Set animation state for an element
  setAnimationState(id: string, state: 'visible' | 'hidden'): void {
    this.animationStates[id] = state;
  }
}

import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  @Output() animationStateChange = new EventEmitter<'visible' | 'hidden'>();
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Set initial state
    this.animationStateChange.emit('hidden');

    // Create and configure IntersectionObserver
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animationStateChange.emit('visible');
          // Unobserve after triggering once
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Start observing
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

import {
  Component,
  Input,
  HostListener,
  OnInit,
  OnChanges,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';

export type CarouselImage = {
  src: string;
  alt?: string;
  caption?: string;
};

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) images: CarouselImage[] = [];
  @Input() startIndex = 0;
  @Input() autoPlay = true;
  @Input() intervalMs = 3500;
  @Input() loop = true;
  @Input() showArrows = true;
  @Input() showIndicators = true;
  @Input() pauseOnHover = true;
  /** e.g. "16/9", "4/3", "1/1" */
  @Input() aspectRatio = '16/9';

  index = signal(0);
  total = computed(() => this.images?.length ?? 0);

  private timer: any;
  private touchStartX = 0;

  ngOnInit() {
    this.index.set(
      Math.min(Math.max(this.startIndex, 0), Math.max(this.total() - 1, 0))
    );
    this.setupAutoplay();
  }
  ngOnChanges() {
    this.setupAutoplay();
  }
  ngOnDestroy() {
    this.clearTimer();
  }

  next() {
    if (!this.total()) return;
    const atEnd = this.index() >= this.total() - 1;
    if (atEnd && !this.loop) return;
    this.index.set(atEnd ? 0 : this.index() + 1);
    this.restartAutoplay();
  }
  prev() {
    if (!this.total()) return;
    const atStart = this.index() <= 0;
    if (atStart && !this.loop) return;
    this.index.set(atStart ? this.total() - 1 : this.index() - 1);
    this.restartAutoplay();
  }
  goTo(i: number) {
    if (i < 0 || i >= this.total()) return;
    this.index.set(i);
    this.restartAutoplay();
  }

  // Keyboard nav
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') this.next();
    else if (e.key === 'ArrowLeft') this.prev();
  }

  // Touch swipe
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].clientX;
  }
  onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? this.next() : this.prev();
  }

  // Hover pause
  onMouseEnter() {
    if (this.pauseOnHover) this.clearTimer();
  }
  onMouseLeave() {
    if (this.pauseOnHover) this.startTimer();
  }

  private setupAutoplay() {
    this.clearTimer();
    if (this.autoPlay && this.intervalMs >= 1000 && this.total() > 1)
      this.startTimer();
  }
  private startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => this.next(), this.intervalMs);
  }
  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  private restartAutoplay() {
    if (!this.autoPlay) return;
    this.startTimer();
  }
}

import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-page-order-type',
  templateUrl: './page-order-type.component.html',
  styleUrl: './page-order-type.component.scss',
})
export class PageOrderTypeComponent implements OnInit {
  langaugeService = inject(LanguageService);
  router = inject(Router);
  language = 'En';
  TypeOfOrder: WritableSignal<string> = signal('');
  TakeAway: WritableSignal<string> = signal('');
  DineIn: WritableSignal<string> = signal('');
  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.langaugeService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.langaugeService.getLanguage();
    this.updateTitles();
  }

  onSelectDineIn() {
    this.orderService.setIsTakeaway(false);
    this.router.navigate(['/menu/categories']);
  }

  onSelectTakeAway() {
    this.orderService.setIsTakeaway(true);
    this.router.navigate(['/menu/categories']);
  }

  private updateTitles() {
    // Update titles based on the current language in the service
    this.TypeOfOrder = this.langaugeService.TypeOfOrder;
    this.DineIn = this.langaugeService.DineIn;
    this.TakeAway = this.langaugeService.TakeAway;
    this.language = this.langaugeService.getLanguage();
    //console.log('language', this.language);
  }
}

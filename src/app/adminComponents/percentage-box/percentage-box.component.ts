import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { ApplyPercentage } from '../../models/Categories Requests DTO/apply-percentage.model';
import { ComparePriceService } from '../../Services/compare-price.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-percentage-box',
  templateUrl: './percentage-box.component.html',
  styleUrl: './percentage-box.component.scss',
})
export class PercentageBoxComponent implements OnInit {
  type = input.required<string>();
  id = input.required<number>();
  entity = input.required<string>();
  @Output() addedPercentage = new EventEmitter<boolean>(false);
  @Output() errorMessage = new EventEmitter<string>();

  priceService = inject(ComparePriceService);

  openCompare = false;

  categoryService = inject(CategoryService);
  percentageValue?: number;
  model: ApplyPercentage = {
    type: '',
    percentage: 0,
    id: 0,
    entity: '',
  };

  private languageService = inject(LanguageService);
  IncreasePrice: WritableSignal<string> = signal('');
  DecreasePrice: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.priceService.isCompareOpen$.subscribe((is) => {
      if (!is) {
        this.clearModel();
      }
    });
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }
  ChangeClicked() {
    this.priceService.model.id = this.id();
    this.priceService.model.percentage = this.percentageValue;
    this.priceService.model.type = this.type();
    this.priceService.model.entity = this.entity();

    this.priceService.setIsCompareOpen(true);
  }



  clearModel() {
    this.model = {
      type: '',
      percentage: 0,
      id: 0,
      entity: '',
    };
    this.percentageValue = undefined;
  }

  updateTitles() {
    this.IncreasePrice = this.languageService.IncreasePrice;
    this.DecreasePrice = this.languageService.DecreasePrice;
  }
}

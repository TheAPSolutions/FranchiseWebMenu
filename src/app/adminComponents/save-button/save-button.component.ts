import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  private languageService = inject(LanguageService);
  Save: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  onSave() {
    this.save.emit();
  }

  updateTitles() {
    this.Save = this.languageService.Save;
  }
}

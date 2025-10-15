import { Component, Output, signal, EventEmitter, inject, OnInit,WritableSignal, input } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { OrderModel } from '../../models/Customer Order model/order-model.model';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent implements OnInit {

  clicked = signal<boolean>(true);
  @Output() toggleEvent = new EventEmitter<[boolean, OrderModel]>();
  languageService = inject(LanguageService);
  language = 'Ar';

  order = input.required<OrderModel>();


  toggle() {
   this.toggleEvent.emit([this.clicked(), this.order()]);
  }

  editButtonTitle: WritableSignal<string> = signal('');  
  
  
  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
    this.language = this.languageService.getLanguage();


    // Initialize titles based on the default language
    this.updateTitles();
  }

  updateTitles(){
    this.editButtonTitle = this.languageService.NotesButton;
    this.language = this.languageService.getLanguage();
  }

}

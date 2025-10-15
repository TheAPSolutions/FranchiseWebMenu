import { Component, signal, Output, EventEmitter, Input, inject, OnInit, OnChanges, SimpleChanges, WritableSignal, AfterViewInit, input } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { LanguageService } from '../../Services/language.service';
import { menuItemOptionsService } from '../../Services/menuItemOptions.service';
import { CombinedOptionsDTO } from '../../models/MenuItemOptionsDTO/CombinedOptionsDTO.model';
import { OrderModel } from '../../models/Customer Order model/order-model.model';

@Component({
  selector: 'app-notes-overlay',
  templateUrl: './notes-overlay.component.html',
  styleUrls: ['./notes-overlay.component.scss']
})
export class NotesOverlayComponent implements OnInit, OnChanges {
  clicked = signal<boolean>(false);
  order = input.required<OrderModel>();
  notes: string = ""; 
  orderService = inject(OrderService);
  languageService = inject(LanguageService);
  menuItemOptionsService = inject(menuItemOptionsService);
  options: CombinedOptionsDTO = { drinkOptions: [], foodOptions: [], parentId:0, optionsId: 0 };

  title: WritableSignal<string> = signal('');
  placeholder: WritableSignal<string> = signal('');
  save: WritableSignal<string> = signal('');
  language!: string;

  selectedDrink: number = 0;
  selectedFood: number = 0;




  @Output() toggleEvent = new EventEmitter<[boolean, OrderModel]>();

  ngOnInit(): void {
    if (this.order().itemId !== undefined) {
      this.loadOrderNotes();
      
    }

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      this.language = this.languageService.getLanguage();
    });

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.order().itemId !== undefined) {
      this.loadOrderNotes(); // Reload notes whenever the id changes
    }
  }

  loadOrderNotes(): void {
    //console.log(this.order());
    this.loadOptions(this.order().itemId);
    this.selectedDrink = this.order().drinkOption;
    this.selectedFood = this.order().foodOption;
    // If order exists and has notes, load them; otherwise, set notes to empty
    this.notes = ((this.order() && this.order().notes !== undefined) ? this.order().notes : "") || "";
  }

  loadOptions(parentId:number | undefined): void {
    this.menuItemOptionsService.getMenuItemOptionsByID(parentId || 0).subscribe({
      next: (response) => {
        this.options = response;
      },
      error: (error) => {
        //console.error("An error occurred:", error);
      }
    });
  }

  getPlaceholder(): string {
    return this.notes ? this.notes : this.placeholder();
  }

  toggle() {
    this.orderService.addNotes(this.order(), this.notes);
    this.orderService.EditOptiontoOrder(this.order(), this.selectedDrink, this.selectedFood);
    this.toggleEvent.emit([this.clicked(), this.order()]);
  }

  close() {
    this.toggleEvent.emit([this.clicked(), this.order()]);
  }

  updateTitles(){
    this.title = this.languageService.notesTitle;
    this.placeholder = this.languageService.notesPlaceholder;
    this.language = this.languageService.getLanguage();
    this.save = this.languageService.Save;
  }

  onDrinkChange(event: Event) {
    this.selectedDrink = Number((event.target as HTMLSelectElement).value);
    //console.log("Selected Drink ID:", this.selectedDrink);
  }

  onFoodChange(event: Event) {
    this.selectedFood = Number((event.target as HTMLSelectElement).value);
    //console.log("Selected Food ID:", this.selectedFood);
  }
}

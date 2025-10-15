import { Component, inject, Input, WritableSignal, signal, OnInit, input } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() input_button_image!: string; // Input property for button image
  @Input() address!: string; // Input property for address
  @Input() number!: string; // Input property for address

  languageService = inject(LanguageService);
  editButtonTitle: WritableSignal<string> = signal('');  
  CallBranch: WritableSignal<string> = signal('');  
  GetDirection: WritableSignal<string> = signal('');  
  
  
  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    // Initialize titles based on the default language
    this.updateTitles();
  }

  updateTitles(){
    this.editButtonTitle = this.languageService.NotesButton;
    this.CallBranch = this.languageService.CallBranch;
    this.GetDirection = this.languageService.GetDirection;
  }
  onCall() {
    //console.log("before opening phone app",this.number);
    window.open(`tel:${this.number}`); // Open dialer with phone number
  }

  onGoogleMaps() {
    const encodedAddress = encodeURIComponent(this.address); // Encode address
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`); // Open Google Maps
  }
}

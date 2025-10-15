import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { COUNTRIES } from '../../models/countries';

import { LanguageService } from '../../Services/language.service';


@Component({
  selector: 'app-order-phone-number',
  templateUrl: './order-phone-number.component.html',
  styleUrl: './order-phone-number.component.scss'
})
export class OrderPhoneNumberComponent {

  phoneNumber: string = ''; // User-entered phone number
  isDropdownOpen = false; // Dropdown state
  sendCodetonumber = false;

  private languageService = inject(LanguageService);

  acceptCampaigns: boolean = false; // New property for opt-in

  @Output() phoneNumberEmitted = new EventEmitter<string>();

  language = this.languageService.getLanguage();
  PhoneVerification: WritableSignal<string> = signal('');
  Accept: WritableSignal<string> = signal('');
  VerificationSent: WritableSignal<string> = signal('');
  SendOrder: WritableSignal<string> = signal('');
  EnterNumber: WritableSignal<string> = signal('');

  phoneTitle:string ='';
  updateTitles() {
    this.PhoneVerification = this.languageService.PhoneVerification;
    this.Accept = this.languageService.Accept;
    this.VerificationSent = this.languageService.VerificationSent;
    this.SendOrder = this.languageService.SendOrder;
    this.EnterNumber = this.languageService.EnterNumber;
    this.language = this.languageService.getLanguage();
    switch(this.language.toLowerCase()){
      case 'en':
        this.phoneTitle = 'Please enter your phone number. A message will be sent to you when your order is ready.';
        break;
      case 'tr':
        this.phoneTitle = 'Lütfen telefon numaranızı girin. Siparişiniz hazır olduğunda size bir mesaj gönderilecektir.';
        break;
      case 'ar':
        this.phoneTitle = 'يرجى إدخال رقم هاتفك. سيتم إرسال رسالة إليك عند تجهيز طلبك.';
        break;
    }

  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
      this.language = this.languageService.getLanguage();
    });
    this.updateTitles();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

import { Component, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CountryCode } from '../../../../assets/countrycode.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteLanguageService } from '../../../../assets/services/website-language.service';
import { LanguageService } from '../../../Services/language.service';
import { NotificationService } from '../../../Services/notification.service';
@Component({
  selector: 'app-contactform-website',
  templateUrl: './contactform-website.component.html',
  styleUrl: './contactform-website.component.scss',
  animations: [
    trigger('fadeInFromLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
    trigger('fadeInFromRight', [
      state('hidden', style({ opacity: 0, transform: 'translateX(50px)' })),
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
export class ContactformWebsiteComponent {
  animationStates: { [key: string]: 'visible' | 'hidden' } = {};
  private animationTimers: { [key: string]: any } = {};

  getAnimationState(id: string): 'visible' | 'hidden' {
    return this.animationStates[id] || 'hidden';
  }

  // Set animation state for an element
  setAnimationState(
    id: string,
    state: 'visible' | 'hidden',
    delay: number = 0
  ): void {
    if (state === 'visible' && delay > 0) {
      // Clear any existing timer for this element
      if (this.animationTimers[id]) {
        clearTimeout(this.animationTimers[id]);
      }

      // Set the animation after the specified delay
      this.animationTimers[id] = setTimeout(() => {
        this.animationStates[id] = state;
      }, delay);
    } else {
      // Immediate animation with no delay
      this.animationStates[id] = state;
    }
  }
  ngOnDestroy(): void {
    Object.values(this.animationTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  }

  selectedCountryCode: string = '+90'; // Default value
  countryCodes: CountryCode[] = [];
  searchTerm: string = '';
  filteredCountryCodes: CountryCode[] = [];
  websiteTranslateService = inject(WebsiteLanguageService);
  languageService = inject(LanguageService);
  notificationService = inject(NotificationService);

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http
      .get<CountryCode[]>('../../../../assets/country-codes.json')
      .subscribe((data) => {
        this.countryCodes = data.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredCountryCodes = [...this.countryCodes]; // Initialize filtered list
      });
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: [this.selectedCountryCode, Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9\- ]+$/)],
      ],
      message: ['', Validators.required],
    });
  }
  contactForm!: FormGroup;

  confirmationMessage = this.websiteTranslateService.getTranslatedValue(
    'emailstatus',
    'success'
  );

  ngOnInit() {
    // Load country codes from JSON file
    this.http
      .get<CountryCode[]>('../../../../assets/country-codes.json')
      .subscribe((data) => {
        this.countryCodes = data.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredCountryCodes = [...this.countryCodes]; // Initialize filtered list
      });

    this.languageService.currentLanguage$.subscribe((lang) => {
      this.confirmationMessage =
        this.websiteTranslateService.getTranslatedValue(
          'emailstatus',
          'success'
        );
    });
  }

  filterCountries() {
    if (!this.searchTerm.trim()) {
      this.filteredCountryCodes = [...this.countryCodes];
      return;
    }

    const search = this.searchTerm.toLowerCase().trim();
    this.filteredCountryCodes = this.countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.code.toLowerCase().includes(search) ||
        country.dial_code.includes(search)
    );
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const endpoint = 'https://localhost:7142/api/Contacts/hungry';
    const payload = this.contactForm.value; // <-- plain object

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload), // <-- serialize the value
      });

      if (!response.ok) {
        console.error('Server error', await response.text());
        // optionally show a notification...
        return;
      }

      const result = await response.json();
      console.log('Success:', result);
      this.notificationService.showMessage(
        this.confirmationMessage.toString(),
        'Success'
      );

      // you can reset the form or notify the user here:
      this.contactForm.reset();
    } catch (err) {
      console.error('Network or other error', err);
      // notify user of network failure...
    }
  }
}

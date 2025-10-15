import {
  Component,
  inject,
  OnInit,
  signal,
  VERSION,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-sucess-order',
  templateUrl: './sucess-order.component.html',
  styleUrl: './sucess-order.component.scss',
})
export class SucessOrderComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  name = 'Angular ' + VERSION.major;
  SuccessOrder: WritableSignal<string> = signal('');
  Thanks: WritableSignal<string> = signal('');
  YourOrderID: WritableSignal<string> = signal('');
  ratingmessage: WritableSignal<string> = signal('');
  private languageService = inject(LanguageService);


  private updateTitles() {
    // Update titles based on the current language in the service
    this.SuccessOrder = this.languageService.SuccessOrder;
    this.Thanks = this.languageService.Thanks;
    this.YourOrderID = this.languageService.YourOrderID;
    this.ratingmessage = this.languageService.ratingMessage;
  }

  navFrom?: string;
  orderId?: number;

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    this.route.queryParams.subscribe(params => {
      // Check if orderID exists and is a valid number
      const orderIdParam = params['orderID'];
      this.orderId = orderIdParam && !isNaN(Number(orderIdParam)) ? Number(orderIdParam) : undefined;

      if (this.orderId === undefined) {
        //console.error("Invalid orderID:", orderIdParam);
      }

      // Get navFrom as a string
      this.navFrom = params['navFrom'] || '';
    });

    // Initialize titles based on the default language
    this.updateTitles();
    setTimeout(() => {
      this.router.navigate(['']); // Replace with your target route
    }, 5000);
  }


}

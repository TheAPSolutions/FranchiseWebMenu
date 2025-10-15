import { Component, effect, inject, Renderer2 } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-payment',
  templateUrl: './page-payment.component.html',
  styleUrl: './page-payment.component.scss',
})
export class PagePaymentComponent {
  private paymentService = inject(PaymentService);
  private route = inject(ActivatedRoute);

  orderAmount!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderAmount = +params['totalPrice']; // Use + to convert to number
      //console.log('Total Price:', this.orderAmount);
    });
    this.initiatePayment();
  }

  initiatePayment() {
    // Call the backend API to generate 3D Host fields
    this.paymentService.generate3DHost(this.orderAmount).subscribe((data) => {
      this.createAndSubmitForm(data);
      //console.log(data);
    });
  }

  createAndSubmitForm(paymentData: any) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://vpostest.qnb.com.tr/Gateway/3DHost.aspx';

    // Transform keys to capitalize the first letter
    const transformedData: any = {};
    Object.keys(paymentData).forEach((key) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      transformedData[capitalizedKey] = paymentData[key];
    });

    // Add hidden inputs dynamically based on the transformed data
    Object.keys(transformedData).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = transformedData[key];
      form.appendChild(input);
    });

    // Append and submit the form
    document.body.appendChild(form);
    form.submit();
  }

}

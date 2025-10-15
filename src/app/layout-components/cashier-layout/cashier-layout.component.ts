import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier-layout',
  templateUrl: './cashier-layout.component.html',
  styleUrl: './cashier-layout.component.scss',
})
export class CashierLayoutComponent {
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url; // gets the current URL
    //console.log(this.currentUrl);
  }
}

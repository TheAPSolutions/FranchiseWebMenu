import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url; // gets the current URL
    //console.log(this.currentUrl);
  }
}

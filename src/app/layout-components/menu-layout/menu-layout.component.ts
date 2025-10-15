import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrl: './menu-layout.component.scss'
})
export class MenuLayoutComponent {
  router = inject(Router);

}

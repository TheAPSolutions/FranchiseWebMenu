import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../Services/Auth.service';
import { User } from '../../models/LoginModel/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier-header',
  templateUrl: './cashier-header.component.html',
  styleUrl: './cashier-header.component.scss'
})
export class CashierHeaderComponent implements OnInit {
  private authService = inject(LoginService);
  private router = inject(Router);
  user?: User;

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/cashier').then(() => {
      window.location.reload(); // Force a page reload after navigation
    });
  }
}

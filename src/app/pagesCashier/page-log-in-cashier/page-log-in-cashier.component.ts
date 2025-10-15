import { Component, inject } from '@angular/core';
import { LoginDTO } from '../../models/LoginModel/login-request.model';
import { LoginService } from '../../Services/Auth.service';
import { REPL_MODE_SLOPPY } from 'repl';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from '../../models/LoginModel/user.model';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-page-log-in-cashier',
  templateUrl: './page-log-in-cashier.component.html',
  styleUrl: './page-log-in-cashier.component.scss',
})
export class PageLogInCashierComponent {
  model: LoginDTO;
  private authService = inject(LoginService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  user?: User;
  private notificationService = inject(NotificationService);


  constructor() {
    this.model = {
      username: '',
      password: '',
    };
  }

  onFormSubmit() {
    //console.log('user from submit', this.model);
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // Set the Cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        //console.log('Form submitted, response received');
        //console.log(response);

        // Set the User
        this.authService.setUser({
          username: response.userName,
          roles: response.roles,
          branchId: response.branchId
        });

        this.authService.user().subscribe({
          next: (response) => {
            this.user = response;
          },
        });

        this.user = this.authService.getUser();
        //console.log(this.user);
        this.showSuccessMessage();

        // Redirect
        this.router.navigateByUrl('/cashier/newOrders').then(() => {
          window.location.reload(); // Force a page reload after navigation
        });
      },
      error: (error) => {
        //console.error('Error during login:', error);
        this.showErrorMessage();
      },
      complete: () => {
        //console.log('Login request complete');
      },
    });
  }

  setPassword(passwordChild: string) {
    this.model.password = passwordChild;
  }

  showErrorMessage() {
    this.notificationService.showMessage(
      'Incorrect Log in Information',
      'danger'
    );
  }

  showSuccessMessage() {
    this.notificationService.showMessage(
      'You Logged In successfully',
      'success'
    );
  }
}

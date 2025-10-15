import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../Services/Auth.service';
import { jwtDecode } from 'jwt-decode';

export const authCashierGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(LoginService);
  const router = inject(Router);
  const user = authService.getUser();

  //check for the JWT Token
  let token = cookieService.get('Authorization');
  if (token && user) {
    token = token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(token);

    //check if token has expired
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    //session is expired
    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      //Token is valid
      if (user.roles.includes('Cashier')) {
        return true;
      } else {
        alert('Unauthorized');
        authService.logout();
        return router.createUrlTree(['/'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url },
    });
  }
};

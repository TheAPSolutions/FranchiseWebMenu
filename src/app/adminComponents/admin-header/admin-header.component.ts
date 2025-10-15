import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LoginService } from '../../Services/Auth.service';
import { User } from '../../models/LoginModel/user.model';
import { Router } from '@angular/router';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent implements OnInit {
  private authService = inject(LoginService);
  private router = inject(Router);
  user?: User;

  private languageService = inject(LanguageService);
  LogOut: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
        //console.log('the user is', response);
      },
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/admin').then(() => {
      window.location.reload(); // Force a page reload after navigation
    });
  }

  updateTitles() {
    this.LogOut = this.languageService.LogOut;
  }
}

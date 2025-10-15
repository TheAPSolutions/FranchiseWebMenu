import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LoginService } from '../../Services/Auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/LoginModel/user.model';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  activeLink: string = 'dashboard';
  languageOpened = false;
  private language = inject(LanguageService);
  Dashboard: WritableSignal<string> = signal('');
  Home: WritableSignal<string> = signal('');

  setActive(link: string) {
    this.activeLink = link;
    //console.log(this.activeLink);
    console.log('Active Link:', this.activeLink); // Debugging
  }

  private authService = inject(LoginService);
  private router = inject(Router);
  user?: User;

  ngOnInit(): void {
    this.setActive('dashboard');

    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
        //console.log('the user is', response);
      },
    });
    this.user = this.authService.getUser();

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/admin').then(() => {
      window.location.reload(); // Force a page reload after navigation
    });
  }

  languageToggle() {
    this.languageOpened = !this.languageOpened;
  }

  onChange(item: string) {
    this.language.setLanguage(item); // Change the language in the service
    this.languageToggle(); // Close the dropdown
  }

  languageService = inject(LanguageService);

  updateTitles() {
    this.Dashboard = this.languageService.Dashboard;
    this.Home = this.languageService.Home;
  }
}

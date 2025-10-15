import {
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrl: './navigation-admin.component.scss',
})
export class NavigationAdminComponent {
  activeLink: string = '';

  private languageService = inject(LanguageService);
  MenuList: WritableSignal<string> = signal('');
  CategoryList: WritableSignal<string> = signal('');
  MenuOrder: WritableSignal<string> = signal('');
  CategoryOrder: WritableSignal<string> = signal('');
  SubCategoryOrder: WritableSignal<string> = signal('');
  Offers: WritableSignal<string> = signal('');
  ExportMenu: WritableSignal<string> = signal('');
  SubCategories: WritableSignal<string> = signal('');
  Dashboard: WritableSignal<string> = signal('');
  

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  // Method to set the active link
  setActive(link: string) {
    this.activeLink = link;
    //console.log(this.activeLink);
  }

  updateTitles() {
    this.MenuList = this.languageService.MenuList;
    this.CategoryList = this.languageService.CategoryList;
    this.MenuOrder = this.languageService.MenuOrder;
    this.CategoryOrder = this.languageService.CategoryOrder;
    this.SubCategoryOrder = this.languageService.SubCategoryOrder;
    this.Offers = this.languageService.Offers;
    this.ExportMenu = this.languageService.ExportMenu;
    this.SubCategories = this.languageService.SubCategories;
    this.Dashboard = this.languageService.Dashboard;
  }
}

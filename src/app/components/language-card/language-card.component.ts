import { Component, inject } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-language-card',
  templateUrl: './language-card.component.html',
  styleUrl: './language-card.component.scss'
})
export class LanguageCardComponent {
  langaugeService = inject(LanguageService);
  router = inject(Router);

  onTurkish(){
    this.langaugeService.setLanguage('Tr');
    this.router.navigate(['/menu/ordertype']);
  }

  onArabic(){
    this.langaugeService.setLanguage('Ar');
    this.router.navigate(['/menu/ordertype']);
  }

  onEnglish(){
    this.langaugeService.setLanguage('En');
    this.router.navigate(['/menu/ordertype']);
  }
}

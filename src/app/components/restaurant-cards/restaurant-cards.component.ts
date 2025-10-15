import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../Services/language.service';
import { FranchiseService } from '../../Services/franchise.service';

@Component({
  selector: 'app-restaurant-cards',
  templateUrl: './restaurant-cards.component.html',
  styleUrl: './restaurant-cards.component.scss',
})
export class RestaurantCardsComponent {
  franchiseService = inject(FranchiseService);
  router = inject(Router);

  onlounge() {
    this.franchiseService.setRestaurant('lounge');
    this.franchiseService.setRestaurantId(
      '750cfb05-9020-4a74-a7e8-6492877778fc'
    );
    this.router.navigate(['/menu/languages']);
  }

  onClassic() {
    this.franchiseService.setRestaurant('classic');
    this.franchiseService.setRestaurantId(
      '7ec15abf-39e1-42ca-af20-dc23a40def68'
    );
    this.router.navigate(['/menu/languages']);
  }

  onfried() {
    this.franchiseService.setRestaurant('fried');
    this.franchiseService.setRestaurantId(
      '7e6b2514-94cb-4a41-a755-ea87540e0f8c'
    );
    this.router.navigate(['/menu/languages']);
  }
}

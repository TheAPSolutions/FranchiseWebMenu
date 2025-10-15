import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { BranchService } from '../../Services/branch.service';
import { getBranches } from '../../models/Branch/get-branch.model';
import { Offers } from '../../models/Offers Models/offers.model';
import { OffersServiceService } from '../../Services/offers-service.service';
import { NotificationService } from '../../Services/notification.service';
import { response } from 'express';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrl: './page-info.component.scss'
})
export class PageInfoComponent {
  languageService = inject(LanguageService);
  branchService = inject(BranchService);
  offerService = inject(OffersServiceService);
  notificationService = inject(NotificationService);

  branches:getBranches[] = [];
  OurBranches: WritableSignal<string> = signal('');
  OurOffers: WritableSignal<string> = signal('');
  OurApplication: WritableSignal<string> = signal('');
  OurSocials: WritableSignal<string> = signal('');
  RatingReminder: WritableSignal<string> = signal('');
  RateUs: WritableSignal<string> = signal('');
  YourOpinion: WritableSignal<string> = signal('');

  branchDesc!:string;

  
  NavLeft: WritableSignal<string> = signal('');
  NavRight: WritableSignal<string> = signal('');

  offers: Offers[] = [];
  language = 'En';

  
  ngOnInit(): void {
    // Subscribe to language changes to update titles reactively
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  
    // Subscribe to the observable returned by getAllBranches()
    this.branchService.getAllBranches().subscribe({
      next: (response) =>{
        this.branches = response;
      },
      error: (response) =>{
        this.notificationService.showMessage(response, 'danger');
      }
    }

    );

    this.offerService.getAllOffers().subscribe({
      next: (offer) => {
        this.offers = offer;
      },
      error: (error) => {
        this.notificationService.showMessage(error, 'danger');
      }
    }
      
    );
  
    // Initialize titles based on the default language
    this.updateTitles();
  }
  
  
     private updateTitles() {
    // Update titles based on the current language in the service
    this.OurBranches = this.languageService.OurBranches;
    this.OurOffers = this.languageService.OurOffers;
    this.OurApplication = this.languageService.OurApplication;
    this.OurSocials = this.languageService.OurSocials;
    this.NavLeft = this.languageService.Menu;
    this.NavRight = this.languageService.Cart;
    this.RatingReminder = this.languageService.RatingReminder;
    this.RateUs = this.languageService.RateUs;
    this.YourOpinion = this.languageService.YourOpinion;

    this.language = this.languageService.getLanguage();

    
  }
  
  goToInsta(){
    window.open('https://www.instagram.com/hungry_birdstr/', '_blank');
  }
  goToTiktok(){
    //console.log('TikTok clicked');
    window.open('https://www.tiktok.com/@hungrybirdstr/', '_blank');
  }
  goToSnap(){
    window.open('https://www.snapchat.com/add/hungrybirds.tr', '_blank');
  }
  goToPlayStore(){
    window.open('https://play.google.com/apps/internaltest/4701668553659949579', '_blank');
  }
  goToAppStore(){
    window.open('https://apps.apple.com/tr/app/hungry-birds/id6504536764?l=tr', '_blank');
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-button-website',
  templateUrl: './cta-button-website.component.html',
  styleUrl: './cta-button-website.component.scss',
})
export class CtaButtonWebsiteComponent {
  OrderPressed: boolean = false;
  @Input({ required: true }) Branch: string = 'basaktas';

  goToTrendyol() {
    switch (this.Branch.toLowerCase()) {
      case 'maslak':
        window.open(
          'https://tgoyemek.com/restoranlar/203339#bu-restoranin-en-sevilenleri',
          '_blank'
        );
        break;

      case 'batisehir':
        window.open('https://tgoyemek.com/restoranlar/226150', '_blank');
        break;

      default:
        window.open(
          'https://tgoyemek.com/restoranlar/160628#bu-restoranin-en-sevilenleri',
          '_blank'
        );
        break;
    }
  }
  goToGetir() {
    switch (this.Branch.toLowerCase()) {
      case 'maslak':
        window.open(
          'https://getir.com/yemek/restoran/hungry-birds-maslak-mah-sariyer-istanbul/',
          '_blank'
        );
        break;

      case 'batisehir':
        window.open(
          'https://getir.com/yemek/restoran/hungry-birds-goztepe-mah-bagcilar-istanbul/',
          '_blank'
        );
        break;

      default:
        window.open(
          'https://getir.com/yemek/restoran/hungry-birds-cihannuma-mah-besiktas-istanbul/',
          '_blank'
        );
        break;
    }
  }
  goToYemek() {
    switch (this.Branch.toLowerCase()) {
      case 'maslak':
        window.open(
          'https://www.yemeksepeti.com/restaurant/z5t9/hungry-birds-z5t9',
          '_blank'
        );
        break;

      case 'batisehir':
        window.open(
          'https://www.yemeksepeti.com/restaurant/yksy/hungry-birds-yksy',
          '_blank'
        );
        break;

      default:
        window.open(
          'https://www.yemeksepeti.com/restaurant/gzzm/hungry-birds-gzzm',
          '_blank'
        );
        break;
    }
  }

  goToMaps() {
    switch (this.Branch.toLowerCase()) {
      case 'maslak':
        window.open('https://maps.app.goo.gl/VNoFHS4YWtxLXGrQA', '_blank');
        break;

      case 'batisehir':
        window.open('https://maps.app.goo.gl/jNHDtM52aU1sseg29', '_blank');
        break;

      default:
        window.open('https://maps.app.goo.gl/amFXqMQ3oQt3DjAn7', '_blank');
        break;
    }
  }
  contactOnWhatsApp() {
    switch (this.Branch.toLowerCase()) {
      case 'maslak':
        this.openWhatsApp(
          '905060328432',
          'Hello! I’d like to know more about your services.'
        );
        break;

      case 'batisehir':
        this.openWhatsApp(
          '905011326024',
          'Hello! I’d like to know more about your services.'
        );
        break;

      default:
        this.openWhatsApp(
          '905060328432',
          'Hello! I’d like to know more about your services.'
        );
        break;
    }
  }

  openWhatsApp(phoneNumber: string, message?: string): void {
    let url = `https://wa.me/${phoneNumber}`;
    if (message) {
      url += `?text=${encodeURIComponent(message)}`;
    }
    window.open(url, '_blank'); // opens WhatsApp Web or the app if on mobile
  }
}

import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../../../../assets/services/seo.service';

type Panel = {
  titleKey: string;
  level: 'h1' | 'h2' | 'h3';
  descriptionKey: string;
};

@Component({
  selector: 'app-landing-page-basktas-webiste',
  templateUrl: './landing-page-basktas-webiste.component.html',
  styleUrls: ['./landing-page-basktas-webiste.component.scss'],
})
export class LandingPageBasktasWebisteComponent implements OnInit {
  headers = [
    'Hungry Birds’te her ürün',
    'En taze',
    'Yerel kaynaklı',
    'Titizlikle hazırlanmış',
  ];

  images = [
    {
      src: 'assets/blog/covers/burger-arabic.webp',
      alt: 'Living 1',
      caption: '',
    },
    {
      src: 'assets/blog/covers/chicken-arabic.webp',
      alt: 'Living 2',
      caption: '',
    },
    {
      src: 'assets/blog/covers/burger-istanbul.webp',
      alt: 'Living 3',
      caption: '',
    },
    {
      src: 'assets/blog/covers/homemade-quality.webp',
      alt: 'Living 3',
      caption: '',
    },
    {
      src: 'assets/blog/covers/fried-chicken.webp',
      alt: 'Living 3',
      caption: '',
    },
    {
      src: 'assets/blog/covers/morning-coffee.webp',
      alt: 'Living 3',
      caption: '',
    },
    {
      src: 'assets/blog/covers/best-burgers.webp',
      alt: 'Living 3',
      caption: '',
    },
    {
      src: 'assets/blog/covers/crispy-chicken.webp',
      alt: 'Living 3',
      caption: '',
    },
  ];

  panels: Panel[] = [
    {
      titleKey: 'Hungry Birds’te her ürün',
      level: 'h1',
      descriptionKey: 'seo.panels.0.description',
    },
    {
      titleKey: 'En taze',
      level: 'h2',
      descriptionKey: 'seo.panels.1.description',
    },
    {
      titleKey: 'Yerel kaynaklı',
      level: 'h3',
      descriptionKey: 'seo.panels.2.description',
    },
    {
      titleKey: 'Titizlikle hazırlanmış',
      level: 'h3',
      descriptionKey: 'seo.panels.2.description',
    },
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    // Sayfa başlığı
    this.titleService.setTitle('Beşiktaş Hamburger ve Fast Food');

    // Meta description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Beşiktaş hamburger ve fastfood deneyimini Hungry Birds’te yaşayın. Taze burgerler, çıtır fried chicken ve vejetaryen seçeneklerle hızlı servis',
    });

    // 1) Meta tags
    this.seo.set({
      title: 'Beşiktaş Gece Burgercisi – Hungry Birds',
      description:
        'Beşiktaş Gece Burgercisi Hungry Birds’te gece açık hamburger ve fast food keyfi! Taze, kaliteli ve hızlı servisle her saatte lezzeti yakalayın.',
      url: 'https://your-domain.com/besiktas-gece-burgercisi', // TODO: replace with real URL
      // image: 'https://your-domain.com/og-image.jpg' // optional
    });

    // 2) Full article content as JSON-LD (no UI)
    const ARTICLE_BODY = `
Beşiktaş Gece Burgercisi – Gece Açık Hamburger ve Fast Food Keyfi (H1)
Beşiktaş, gündüzleri olduğu kadar geceleri de hareketli bir semt. Özellikle geç saatlerde karnı acıkanların ilk tercihi Beşiktaş Gece Burgercisi Hungry Birds oluyor. Eğlence sonrası hızlı bir atıştırmalık, gece çalışırken doyurucu bir yemek ya da arkadaşlarla uzun sohbetlerin arasında lezzetli bir mola arıyorsanız, Hungry Birds’ün gece hamburgercisi konsepti tam size göre.

Hungry Birds’te Fast Food Yeniden Yorumlanıyor (H2)
Hungry Birds, İstanbul’da doğmuş bir marka olarak Fransız mutfağının zarafetinden ilham alıyor. Burada hızlı servis, sofistike lezzetlerle birleşiyor. Sıradan fast food anlayışının ötesine geçerek, her lokmada rafine bir deneyim sunuyoruz.

Taze, Temiz ve Kaliteli Malzeme Taahhüdümüz
Hungry Birds’te her ürün üç temel ilkeye dayanıyor:
⬆ Hungry Birds’te her ürün
🌱 En taze
🌱 Yerel kaynaklı
🧼 Titizlikle hazırlanmış
Kıtır, canlı sebzelerden özenle seçilmiş etlere ve el yapımı ekmeklere kadar her unsur; saflık, hijyen ve lezzet için seçiliyor. Bu bağlılık sayesinde her burger hem besleyici hem de unutulmaz bir tat deneyimi sunuyor.
• Taze: Günlük ve doğal malzemeler
• Temiz: Hijyen standartlarına uygun hazırlık
• Kaliteli: El yapımı ekmekler ve özenle seçilmiş etler

Beşiktaş Gece Hamburgercisi ile Lezzet Dolu Bir Deneyim (H3)
Gece boyunca sıcak ve taze yemek bulmak çoğu zaman zor olabilir. İşte bu noktada devreye Beşiktaş gece hamburgercisi Hungry Birds olarak biz giriyoruz. Menüdeki her burger, özenle seçilen malzemelerle ve özel tariflerle hazırlanıyor. Sadece açlığınızı gidermekle kalmıyor, aynı zamanda size unutulmaz bir gece hamburger deneyimi sunuyoruz.

Beşiktaş Gece Açık Hamburgerci – Hızlı ve Taze Fast Food (H2)
Gece geç saatlerde kaliteli ve hızlı yemek bulmak isteyenler için Beşiktaş gece açık hamburgerci arayışınız burada son buluyor. Hungry Birds, gece boyunca misafirlerine taze pişirilmiş hamburgerler, çıtır patatesler ve özel soslarla hazırlanmış menüler sunuyor. Hem doyurucu hem de pratik bir gece fast food deneyimi yaşamak isteyenler için Beşiktaş’ın vazgeçilmez adresiyiz.

Beşiktaş Gece Fast Food Mekanları Arasında Farkımız (H3)
Beşiktaş’ta pek çok fast food noktası bulunuyor, ancak her mekân gece boyunca hizmet vermiyor. Beşiktaş gece fast food mekanları arasında öne çıkmamızın nedeni, yalnızca lezzetli yemeklerimiz değil; aynı zamanda müşteri memnuniyetini ön planda tutan anlayışımız. Kaliteli malzemeler, güler yüzlü hizmet ve gece boyunca kesintisiz servis ile fark yaratıyoruz.

Beşiktaş Gece Burger Mekanları – Her Damak Zevkine Uygun Menü (H3)
Sadece klasik hamburgerlerle sınırlı kalmıyoruz. Özel soslarla hazırlanan gurme burgerler, tavuk seçenekleri ve vejetaryen menülerimizle Beşiktaş gece burger mekanları arasında geniş bir yelpazeye sahibiz. Gece boyunca açık olan bu özel burger noktası, arkadaş grupları için keyifli bir buluşma noktası olmanın yanı sıra, hızlı ve uygun fiyatlı yemek isteyenler için de ideal bir tercih.

Neden Beşiktaş Gece Burgercisi Hungry Birds? (H2)
• Gece boyunca açık olan hamburgerci hizmeti
• Taze, temiz ve kaliteli malzemelerle hazırlanan menüler
• Uygun fiyatlı fast food seçenekleri
• Eğlence sonrası veya gece atıştırmalıkları için ideal konum
• Samimi atmosfer, hızlı servis ve sofistike lezzetler

Beşiktaş’ta Gece Açık Olan Hamburgerciler Arasında Doğru Adres (H2)
Beşiktaş’ın enerjisi gece saatlerinde de devam ediyor. Siz de bu hareketliliğe lezzet katmak isterseniz, gece açık olan hamburgerciler arasında ilk tercihiniz Hungry Birds Beşiktaş Gece Burgercisi olmalı. Gecenin herhangi bir saatinde karnınız acıktığında, sizi sıcak, taze ve rafine burgerlerimizle karşılamaktan mutluluk duyarız.

Meta Description: Beşiktaş Gece Burgercisi Hungry Birds’te gece açık hamburger ve fast food keyfi! Taze, kaliteli ve hızlı servisle her saatte lezzeti yakalayın.
Keyword: Beşiktaş Gece Burgercisi
`.trim();

    this.seo.upsertJsonLd('article-besiktas', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      inLanguage: 'tr',
      headline:
        'Beşiktaş Gece Burgercisi – Gece Açık Hamburger ve Fast Food Keyfi',
      description:
        'Beşiktaş’ta gece açık hamburger ve fast food: taze malzemeler, hızlı servis, el yapımı ekmekler ve özel soslar ile rafine bir gece lezzeti.',
      keywords: 'Beşiktaş Gece Burgercisi',
      articleBody: ARTICLE_BODY,
      author: { '@type': 'Organization', name: 'Hungry Birds' },
      publisher: { '@type': 'Organization', name: 'Hungry Birds' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://your-domain.com/besiktas-gece-burgercisi',
      },
    });
  }

  menu() {
    window.location.href = 'https://wearehungrybirds.com/menu';
  }

  odernow() {
    window.open(
      'https://www.yemeksepeti.com/restaurant/gzzm/hungry-birds-gzzm',
      '_blank'
    );
  }
}

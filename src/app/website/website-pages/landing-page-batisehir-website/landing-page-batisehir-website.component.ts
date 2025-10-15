import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../../../../assets/services/seo.service';

@Component({
  selector: 'app-landing-page-batisehir-website',
  templateUrl: './landing-page-batisehir-website.component.html',
  styleUrls: ['./landing-page-batisehir-website.component.scss'],
})
export class LandingPageBatisehirWebsiteComponent implements OnInit {
  images = [
    {
      src: 'assets/blog/covers/burger-arabic.webp',
      alt: 'Burger Arabic',
      caption: '',
    },
    {
      src: 'assets/blog/covers/chicken-arabic.webp',
      alt: 'Chicken Arabic',
      caption: '',
    },
    {
      src: 'assets/blog/covers/burger-istanbul.webp',
      alt: 'Burger Istanbul',
      caption: '',
    },
    {
      src: 'assets/blog/covers/homemade-quality.webp',
      alt: 'Homemade Quality',
      caption: '',
    },
    {
      src: 'assets/blog/covers/fried-chicken.webp',
      alt: 'Fried Chicken',
      caption: '',
    },
    {
      src: 'assets/blog/covers/morning-coffee.webp',
      alt: 'Morning Coffee',
      caption: '',
    },
    {
      src: 'assets/blog/covers/best-burgers.webp',
      alt: 'Best Burgers',
      caption: '',
    },
    {
      src: 'assets/blog/covers/crispy-chicken.webp',
      alt: 'Crispy Chicken',
      caption: '',
    },
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    // Sayfa başlığı
    this.titleService.setTitle('Batışehir Hamburger ve Fast Food');

    // Meta description (özgünleştirilmiş)
    this.metaService.updateTag({
      name: 'description',
      content:
        'Batışehir’de hamburger ve fast food tutkunları için Hungry Birds farkını keşfedin. El yapımı soslarla hazırlanan burgerler, çıtır fried chicken ve vegan seçeneklerle hızlı, doyurucu ve keyifli bir yemek deneyimi sizi bekliyor.',
    });

    // 2.1 Meta tags (visible only to crawlers / head)
    this.seo.set({
      title: 'Batışehir Gece Açık Hamburgerci – Hungry Birds',
      description:
        'Batışehir Gece Açık Hamburgerci Hungry Birds, gece burgercisi konseptiyle taze, kaliteli ve hızlı servis sunuyor. Gece hamburger, fast food ve doyurucu menü seçenekleriyle Batışehir’in en popüler hamburgercisi!',
      url: 'https://your-domain.com/batisehir-gece-acik-hamburgerci', // TODO: change to real URL
      // image: 'https://your-domain.com/og-image.jpg' // optional
    });

    // 2.2 Full article content as JSON-LD (no UI)
    const ARTICLE_BODY = `
Batışehir Gece Açık Hamburgerci – Gece Burger Keyfinin Vazgeçilmez Adresi (H1)
Batışehir Gece Açık Hamburgerci Hungry Birds, gecenin geç saatlerinde lezzetli bir yemek arayanlar için vazgeçilmez bir durak...
Batışehir’in canlı atmosferinde, gece burgercisi kültürünü modern bir dokunuşla sunan Hungry Birds; taptaze malzemeler, hızlı servis ve özel soslarla hazırlanan hamburger çeşitleriyle öne çıkıyor. Gece hamburgeri yemek isteyenlere sadece doyurucu bir menü değil, aynı zamanda hızlı, kaliteli ve güvenilir bir fast food deneyimi sunuyor.
Gece açık hamburgerci denildiğinde akla ilk gelen Hungry Birds, eğlence sonrası atıştırmalık arayanlardan gece vardiyasından çıkanlara kadar herkese hitap ediyor. Çıtır patatesler, bol malzemeli gurme burgerler ve özel soslarıyla Batışehir’de hamburger yemek artık çok daha keyifli.

Batışehir Gece Burgercisi – Hungry Birds Farkı (H2)
Her burgerci gece boyunca aynı kaliteyi sunmaz. Hungry Birds’ü farklı kılan şey, gece hamburgercisi konseptini taze malzemeler, el yapımı ekmekler ve özel soslarla buluşturmasıdır. Menüdeki her ürün, özenle seçilmiş etler, günlük sebzeler ve katkısız ekmeklerle hazırlanır.
• Gece boyunca açık hizmet
• Taze ve yerel kaynaklı malzemeler
• Çıtır patatesler ve özel soslar
• Hızlı servis ve güler yüzlü ekip
• Hem klasik hem de gurme burger seçenekleri
Böylece Hungry Birds, Batışehir gece açık hamburgerci arayanların ilk tercihi haline gelir.

Batışehir Gece Açık Hamburgerci – Fast Food’un Yeni Yorumuyla (H2)
Batışehir’de gece fast food yemek isteyenlerin beklentileri genellikle hız ve doyuruculuk üzerinedir. Hungry Birds, bu anlayışı farklı bir noktaya taşıyor: burada fast food sadece hızlı değil, aynı zamanda temiz, kaliteli ve özenle hazırlanmış bir deneyimdir.
Gece fastfood arayan misafirler için:
• Gurme burger çeşitleri
• Vejetaryen alternatifler
• El yapımı soslarla hazırlanmış menüler
• Geceye özel atıştırmalıklar
Sunulan her ürün, “gece hamburger” kültürünü Batışehir’de zirveye taşıyor.

Batışehir Gece Hamburgercisi – Her Damak Zevkine Hitap Eden Menü (H3)
• Klasik Burgerler: Geleneksel tatlardan vazgeçmeyenler için.
• Gurme Seçenekler: Fransız mutfağının zarif dokunuşlarıyla.
• Tavuk Menüleri: Çıtır tavuk burgerler ve kanat seçenekleri.
• Vejetaryen Alternatifler: Et tercih etmeyenler için özenle hazırlanmış burgerler.
Her bir seçenek, gece açık olan hamburgerciler arasında Hungry Birds’ü farklı bir noktaya taşır.

Batışehir Gece Açık Hamburgerci ile Eğlence Sonrası Lezzet (H2)
Batışehir, gece hayatı ve yoğun temposuyla bilinir. Gece geç saatlerde eğlenceden çıkanlar için doyurucu ve hızlı bir yemek bulmak çoğu zaman zordur. Bu noktada Hungry Birds, gece açık hamburgerci konseptiyle devreye giriyor.
Eğlenceden çıkanlar için en ideal çözüm:
• Sıcak burgerler
• Hızlı servis
• Rahat oturma alanı
• Gece boyunca süren açık mutfak
Hungry Birds, sadece bir yemek değil, gecenizi taçlandıran bir deneyim sunuyor.

Batışehir Gece Fast Food Mekanları Arasında Farkımız (H3)
• Gece boyunca açık mutfak
• Tazelik ve kaliteye bağlılık
• El yapımı ekmek ve özel soslar
• Samimi atmosfer ve güler yüzlü hizmet

Batışehir Gece Açık Olan Hamburgerciler Arasında Neden İlk Tercih?
1. Kalite: Yerel kaynaklı malzemeler, günlük hazırlanan ürünler.
2. Hız: Gece saatlerinde bile hızlı ve sorunsuz servis.
3. Çeşitlilik: Klasik, gurme, tavuk ve vejetaryen menüler.
4. Konum: Batışehir’in merkezinde kolay ulaşım.
5. Deneyim: Sadece yemek değil, keyifli bir gece molası.

Batışehir Gece Açık Hamburgerci – Hungry Birds’te Tazelik Garantisi (H2)
• En taze sebzeler
• Özenle seçilmiş etler
• El yapımı katkısız ekmekler

Batışehir Gece Açık Hamburgerci | Sıkça Sorulan Sorular (H3)
1) Batışehir Gece Açık Hamburgerci Hungry Birds kaçta kapanıyor?
Hungry Birds, gece boyunca açık olup sabahın erken saatlerine kadar hizmet verir.
2) Gece fast food menüsünde hangi ürünler var?
Burger çeşitleri, çıtır patates, tavuk alternatifleri, özel soslar ve vejetaryen seçenekler.
3) Diğer gece burgercilerinden farkınız ne?
Taze malzeme garantisi, el yapımı ekmekler ve müşteri memnuniyeti.
4) Gece siparişlerde paket servis mevcut mu?
Evet, gece boyunca paket servis mevcuttur.
5) Fiyatlar uygun mu?
Kaliteli ve uygun fiyatlı seçenekler sunuyoruz.
`.trim();

    this.seo.upsertJsonLd('article-batisehir', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      inLanguage: 'tr',
      headline:
        'Batışehir Gece Açık Hamburgerci – Gece Burger Keyfinin Vazgeçilmez Adresi',
      description:
        'Batışehir’de gece hamburger, fast food ve doyurucu menüler: taze malzemeler, hızlı servis ve gece boyunca açık mutfak.',
      keywords: 'Batışehir Gece Açık Hamburgerci',
      articleBody: ARTICLE_BODY,
      author: { '@type': 'Organization', name: 'Hungry Birds' },
      publisher: { '@type': 'Organization', name: 'Hungry Birds' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://your-domain.com/batisehir-gece-acik-hamburgerci',
      },
    });

    // 2.3 FAQ JSON-LD from your SSS block
    this.seo.upsertJsonLd('faq-batisehir', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Batışehir Gece Açık Hamburgerci Hungry Birds kaçta kapanıyor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hungry Birds, gece boyunca açık olup sabahın erken saatlerine kadar hizmet vermektedir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gece fast food menüsünde hangi ürünler var?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Burger çeşitleri, çıtır patates, tavuk alternatifleri, özel soslar ve vejetaryen seçenekler menüde yer alıyor.',
          },
        },
        {
          '@type': 'Question',
          name: 'Batışehir’deki diğer gece burgercilerinden farkınız ne?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hungry Birds, taze malzeme garantisi, el yapımı ekmekler ve müşteri memnuniyetine verdiği önem ile ayrılıyor.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gece siparişlerde paket servis mevcut mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Hungry Birds gece boyunca paket servis imkânı sunmaktadır.',
          },
        },
        {
          '@type': 'Question',
          name: 'Fiyatlar uygun mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hungry Birds, Batışehir’de gece fast food arayanlara hem kaliteli hem de uygun fiyatlı seçenekler sunar.',
          },
        },
      ],
    });
  }

  menu() {
    window.location.href = 'https://wearehungrybirds.com/menu';
  }

  odernow() {
    window.open(
      'https://www.yemeksepeti.com/restaurant/yksy/hungry-birds-yksy',
      '_blank'
    );
  }
}

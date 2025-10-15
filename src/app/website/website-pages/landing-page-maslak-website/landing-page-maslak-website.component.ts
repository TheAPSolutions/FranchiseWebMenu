import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../../../../assets/services/seo.service';

@Component({
  selector: 'app-landing-page-maslak-website',
  templateUrl: './landing-page-maslak-website.component.html',
  styleUrls: ['./landing-page-maslak-website.component.scss'],
})
export class LandingPageMaslakWebsiteComponent implements OnInit {
  images = [
    {
      src: 'assets/blog/covers/burger-arabic.webp',
      alt: 'Maslak Hamburger ve Fast Food - Burger Arabic',
      caption: '',
    },
    {
      src: 'assets/blog/covers/chicken-arabic.webp',
      alt: 'Maslak Hamburger ve Fast Food - Chicken Arabic',
      caption: '',
    },
    {
      src: 'assets/blog/covers/burger-istanbul.webp',
      alt: 'Maslak Hamburger ve Fast Food - Burger Istanbul',
      caption: '',
    },
    {
      src: 'assets/blog/covers/homemade-quality.webp',
      alt: 'Maslak Hamburger ve Fast Food - Homemade Quality',
      caption: '',
    },
    {
      src: 'assets/blog/covers/fried-chicken.webp',
      alt: 'Maslak Hamburger ve Fast Food - Fried Chicken',
      caption: '',
    },
    {
      src: 'assets/blog/covers/morning-coffee.webp',
      alt: 'Maslak Hamburger ve Fast Food - Morning Coffee',
      caption: '',
    },
    {
      src: 'assets/blog/covers/best-burgers.webp',
      alt: 'Maslak Hamburger ve Fast Food - Best Burgers',
      caption: '',
    },
    {
      src: 'assets/blog/covers/crispy-chicken.webp',
      alt: 'Maslak Hamburger ve Fast Food - Crispy Chicken',
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
    this.titleService.setTitle('Maslak Hamburger ve Fast Food | Hungry Birds');

    // Meta description (özgünleştirilmiş)
    this.metaService.updateTag({
      name: 'description',
      content:
        'Maslak Hamburger ve Fast Food deneyimini Hungry Birds’te keşfedin. Taze burgerler, çıtır fried chicken ve vegan seçeneklerle hızlı, lezzetli ve doyurucu bir yemek deneyimi sizleri bekliyor.',
    });

    // 1) Meta tags
    this.seo.set({
      title: 'Maslak Gece Hamburgercisi – Hungry Birds',
      description:
        'Maslak Gece Hamburgercisi hamburgerci arıyorsanız, taze, kaliteli ve hızlı fast food deneyimiyle Maslak’ın en lezzetli adresi.',
      url: 'https://your-domain.com/maslak-gece-hamburgercisi', // ← change to your real URL
      // image: 'https://your-domain.com/og-image.jpg' // optional
    });

    // 2) Full article content as JSON-LD (invisible to users)
    const ARTICLE_BODY = `
Maslak Gece Hamburgercisi – Gece Açık Hamburgerci ve Fast Food Deneyimi (H1)
Maslak Gece Hamburgercisi, geç saatlerde lezzet arayışına çıkanların ilk durağı haline geldi. Maslak, gündüzleri iş dünyasının kalbi olurken geceleri de canlı yaşamı ve zengin yemek kültürüyle öne çıkıyor. İster eğlence sonrası hızlı bir atıştırmalık, ister gece vardiyasında enerjinizi tazeleyecek doyurucu bir menü, ister arkadaşlarla geceyi lezzetle tamamlayacağınız özel bir buluşma olsun; Hungry Birds, Maslak’ın vazgeçilmez gece hamburgercisi olarak fark yaratıyor. Burada fast food yalnızca hız değil, aynı zamanda tazelik, kalite ve sofistike bir lezzet anlayışıyla yeniden yorumlanıyor.

Maslak Gece Hamburgercisi ile Gece Açık Fast Food Keyfi (H2)
Maslak Gece Hamburgercisi Hungry Birds, gece saatlerinde sıcak, taze ve kaliteli yemek arayanların kurtarıcısıdır. Gece boyunca açık olan fast food konseptiyle misafirlerine sadece hızlı servis değil, aynı zamanda özenle hazırlanmış gurme lezzetler sunar. Menüdeki her burger; özenle seçilen malzemeler, el yapımı ekmekler ve özel soslarla hazırlanarak hem açlığınızı giderir hem de size unutulmaz bir gece hamburger deneyimi yaşatır.

Maslak Gece Açık Hamburgerci – Hızlı, Taze ve Lezzetli (H2)
Maslak Gece Açık Hamburgerci geç saatlerde yemek arayanların beklentilerini tam anlamıyla karşılıyor. Gece boyunca servis edilen çıtır patatesler, özel soslarla zenginleştirilmiş gurme burger çeşitleri ve hızlı servisiyle Hungry Birds, Maslak’ta gece fast food keyfini bambaşka bir seviyeye taşıyor. Taze malzemeler ve kaliteli sunum sayesinde, sadece karnınızı doyurmakla kalmaz, aynı zamanda unutulmaz bir lezzet deneyimi yaşarsınız.

Maslak Gece Fast Food Mekanları Arasında Hungry Birds’ün Farkı (H2)
Maslak’ta pek çok restoran bulunmasına rağmen, her mekân gece boyunca hizmet sunmuyor. Maslak gece fast food mekanları arasında Hungry Birds’ün farkı; yalnızca lezzetli yemekler değil, aynı zamanda müşteri memnuniyetini merkeze alan hizmet anlayışı. Gece boyunca kesintisiz servis, güler yüzlü ekip ve özenle hazırlanan menüler ile Hungry Birds, Maslak’ın gece hamburgercisi kültüründe ayrıcalıklı bir yere sahip.

Maslak Gece Burger Mekanları – Her Damak Zevkine Uygun Seçenekler (H2)
Hungry Birds, klasik hamburgerlerden öteye geçerek her damak zevkine uygun menüler sunar. Maslak gece burger mekanları arasında öne çıkan Hungry Birds, gurme burger çeşitleri, tavuk alternatifleri, vegan ve vejetaryen seçenekleriyle geniş bir yelpaze sunuyor. Gece boyunca açık olması sayesinde, ister yalnız atıştırmalık arayanlar ister arkadaş grubuyla toplananlar için ideal bir buluşma noktasıdır.

Neden Maslak Gece Hamburgercisi Hungry Birds? (H3)
• 🌙 Gece boyunca açık olan hamburgerci hizmeti
• 🥩 Taze ve kaliteli malzemelerden hazırlanan menüler
• ⚡ Hızlı servis ve uygun fiyatlı fast food seçenekleri
• 🍔 Gurme, klasik, tavuk ve vejetaryen hamburger alternatifleri
• 🤝 Samimi atmosfer ve müşteri odaklı hizmet
Hungry Birds’te fast food yeniden yorumlanıyor. İstanbul’da doğan marka, Fransız mutfağının zarafetinden ilham alarak, hızlı servisi sofistike lezzetlerle buluşturuyor. Her burger; en taze sebzeler, kaliteli etler ve el yapımı ekmeklerle hazırlanıyor. Tazelik, temizlik ve kalite taahhüdüyle Hungry Birds, İstanbul’da fast food deneyimini zirveye taşıyan burgerci olarak konumlanıyor.

Maslak Gece Burgercileri Arasında İlk Tercihiniz (H2)
Maslak’ın hareketli temposu gece boyunca devam ederken, Hungry Birds lezzetiyle bu enerjiyi besliyor. İster eğlence sonrası acıkanlar için, ister gece vardiyasından çıkanlar için, isterse sabaha kadar sohbet eden gruplar için Hungry Birds, Maslak gece açık hamburgerci olarak hizmet veriyor. Gece fast food ihtiyacınız olduğunda, sizi sıcak, doyurucu ve hızlı servis edilen burgerlerle karşılamaktan mutluluk duyuyoruz.

Hungry Birds Hakkında Sıkça Sorulan Sorular (SSS) (H3)
1. Maslak Gece Hamburgercisi Hungry Birds kaçta kapanıyor?
Hungry Birds, gece boyunca açık kalarak misafirlerine kesintisiz hizmet verir.
2. Gece hamburger menüsünde neler var?
Klasik hamburgerler, gurme burger çeşitleri, tavuk ve vejetaryen menüler, çıtır patatesler ve özel soslar sunulmaktadır.
3. Maslak’ta gece fast food siparişi verilebilir mi?
Evet, Hungry Birds’ten gece boyunca hem paket servis hem de yerinde hizmet mümkündür.
4. Hungry Birds diğer gece burger mekanlarından neden farklı?
Tazelik, kalite, müşteri memnuniyeti ve hızlı servis anlayışıyla Hungry Birds, Maslak’ın gece hamburgercisi kültüründe fark yaratır.
5. Vegan ve vejetaryen seçenekler mevcut mu?
Evet, Hungry Birds menüsünde vegan ve vejetaryen burger çeşitleri de yer alıyor.

Keyword: Maslak Gece Hamburgercisi
Meta Description: Maslak Gece Hamburgercisi hamburgerci arıyorsanız, taze, kaliteli ve hızlı fast food deneyimiyle Maslak’ın en lezzetli adresi.
`.trim();

    this.seo.upsertJsonLd('article-maslak', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      inLanguage: 'tr',
      headline:
        'Maslak Gece Hamburgercisi – Gece Açık Hamburgerci ve Fast Food Deneyimi',
      description:
        'Maslak’ta gece açık hamburgerci ve fast food: taze malzemeler, hızlı servis, el yapımı ekmekler ve gurme soslarla rafine bir gece lezzeti.',
      keywords: 'Maslak Gece Hamburgercisi',
      articleBody: ARTICLE_BODY,
      author: { '@type': 'Organization', name: 'Hungry Birds' },
      publisher: { '@type': 'Organization', name: 'Hungry Birds' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://your-domain.com/maslak-gece-hamburgercisi',
      },
    });

    // 3) FAQ JSON-LD (from your SSS)
    this.seo.upsertJsonLd('faq-maslak', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Maslak Gece Hamburgercisi Hungry Birds kaçta kapanıyor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hungry Birds, gece boyunca açık kalarak misafirlerine kesintisiz hizmet verir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gece hamburger menüsünde neler var?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Klasik hamburgerler, gurme burger çeşitleri, tavuk ve vejetaryen menüler, çıtır patatesler ve özel soslar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Maslak’ta gece fast food siparişi verilebilir mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Hungry Birds’ten gece boyunca hem paket servis hem de yerinde hizmet mümkündür.',
          },
        },
        {
          '@type': 'Question',
          name: 'Hungry Birds diğer gece burger mekanlarından neden farklı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tazelik, kalite, müşteri memnuniyeti ve hızlı servis anlayışıyla Hungry Birds, Maslak’ın gece hamburgercisi kültüründe fark yaratır.',
          },
        },
        {
          '@type': 'Question',
          name: 'Vegan ve vejetaryen seçenekler mevcut mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, menümüzde vegan ve vejetaryen burger çeşitleri de yer alıyor.',
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
      'https://www.yemeksepeti.com/restaurant/z5t9/hungry-birds-z5t9',
      '_blank'
    );
  }
}

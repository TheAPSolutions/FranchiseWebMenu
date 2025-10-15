import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleSvc = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  set(meta: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }) {
    if (meta.title) this.titleSvc.setTitle(meta.title);
    if (meta.description) {
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({
        property: 'og:description',
        content: meta.description,
      });
    }
    if (meta.title)
      this.meta.updateTag({ property: 'og:title', content: meta.title });
    if (meta.image)
      this.meta.updateTag({ property: 'og:image', content: meta.image });
    if (meta.url) {
      // canonical
      const link: HTMLLinkElement =
        document.querySelector('link[rel=canonical]') ||
        document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', meta.url);
      if (!link.parentNode) document.head.appendChild(link);
      this.meta.updateTag({ property: 'og:url', content: meta.url });
    }
    this.meta.updateTag({ property: 'og:type', content: 'article' });
  }

    /** Inject or replace an application/ld+json script in <head> */
  upsertJsonLd(key: string, data: object) {
    const head = this.doc.head;
    const selector = `script[type="application/ld+json"][data-key="${key}"]`;
    const existing = head.querySelector(selector) as HTMLScriptElement | null;
    const json = JSON.stringify(data);
    if (existing) {
      existing.text = json;
      return;
    }
    const s = this.doc.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-key', key);
    s.text = json;
    head.appendChild(s);
  }
}

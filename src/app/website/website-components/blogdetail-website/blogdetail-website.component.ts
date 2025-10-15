import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, filter, tap } from 'rxjs/operators';
import { BlogService } from '../../../../assets/services/blog.service';
import { SeoService } from '../../../../assets/services/seo.service';

@Component({
  selector: 'app-blogdetail-website',
  templateUrl: './blogdetail-website.component.html',
  styleUrl: './blogdetail-website.component.scss',
})
export class BlogdetailWebsiteComponent {
  private route = inject(ActivatedRoute);
  private blog = inject(BlogService);
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);

  vm: any;
  safeContent: SafeHtml = '';
  prevSlug: string | null = null;
  nextSlug: string | null = null;

  constructor() {
    // react to :slug changes
    this.route.paramMap.pipe(
      (map) => map // keep TS happy when copying—real code below:
    );
    this.route.paramMap
      .pipe(
        // get current slug
        switchMap((params) => {
          const slug = params.get('slug')!;
          // load current post
          return this.blog.getPostBySlug(slug).pipe(
            tap((post) => {
              if (!post) return;
              this.vm = post;
              this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
                post.content
              );

              // SEO (use absolute image/url if you share on socials)
              this.seo.set({
                title: `${post.title} | Hungry Birds`,
                description: post.excerpt,
                image: location.origin + '/' + (post.coverImage ?? ''),
                url: `${location.origin}/blog/${post.slug}`,
              });

              // compute prev/next from the ordered list
              this.blog.getPosts().subscribe((list) => {
                const idx = list.findIndex((p) => p.slug === post.slug);
                this.prevSlug = idx > 0 ? list[idx - 1].slug : null;
                this.nextSlug =
                  idx >= 0 && idx < list.length - 1 ? list[idx + 1].slug : null;
              });

              // optional: scroll to top on navigation
              window.scrollTo({ top: 0, behavior: 'smooth' });
            })
          );
        })
      )
      .subscribe();
  }

  share(platform: 'linkedin' | 'x' | 'instagram' | 'whatsapp' | 'facebook') {
    if (!this.vm) return;

    const pageUrl = `${location.origin}/blog/${this.vm.slug}`;
    const title = this.vm.title ?? '';
    const excerpt = this.vm.excerpt ?? '';
    const text = `${title}\n${excerpt}`;

    // If Web Share API is available (mobile), offer native share for WA/FB too
    if (
      navigator.share &&
      (platform === 'whatsapp' || platform === 'facebook')
    ) {
      navigator.share({ title, text: excerpt, url: pageUrl }).catch(() => {});
      return;
    }

    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          pageUrl
        )}`;
        break;

      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          pageUrl
        )}&text=${encodeURIComponent(title)}`;
        break;

      case 'facebook':
        // FB pull preview from OG tags on the URL (see section C)
        // Optional: add a quote param for prefilled text
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          pageUrl
        )}&quote=${encodeURIComponent(text)}`;
        break;

      case 'whatsapp':
        // Works on mobile & desktop web
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${title}\n${excerpt}\n${pageUrl}`
        )}`;
        break;

      case 'instagram':
        // Instagram web doesn’t support sharing a link to feed; open app/home as fallback
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
          pageUrl
        )}`;
        break;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
}

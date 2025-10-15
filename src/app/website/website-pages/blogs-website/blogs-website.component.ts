import { Component, inject, signal } from '@angular/core';
import { BlogService } from '../../../../assets/services/blog.service';

@Component({
  selector: 'app-blogs-website',
  templateUrl: './blogs-website.component.html',
  styleUrl: './blogs-website.component.scss',
})
export class BlogsWebsiteComponent {
  private blog = inject(BlogService);

  // Minimal data used by the card
  posts = signal<{ title: string; slug: string; coverImage?: string }[]>([]);

  constructor() {
    this.blog.getPosts().subscribe((list) => {
      this.posts.set(
        list.map((p) => ({
          title: p.title,
          slug: p.slug,
          coverImage: p.coverImage,
        }))
      );
    });
  }
}

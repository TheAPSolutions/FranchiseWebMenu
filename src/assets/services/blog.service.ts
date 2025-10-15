import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BlogPost } from '../../app/models/blog/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  private posts$ = this.http.get<BlogPost[]>('assets/blog/posts.json').pipe(
    map(list =>
      [...list].sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    ),
    shareReplay(1)
  );

  getPosts(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(p => p.slug === slug))
    );
  }
}
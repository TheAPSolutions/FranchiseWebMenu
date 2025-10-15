export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or parsed markdown result
  coverImage?: string;
  tags?: string[];
  author?: string;
  publishedAt: string; // ISO date
}

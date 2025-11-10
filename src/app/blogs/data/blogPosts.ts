export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "test-id",
    slug: "test-slug",
    date: "9th November 2025",
    //
    title: "Test title",
    excerpt: "Test description of the blog post...",
    content: `Test content
    
    Test test test`,
  },
];

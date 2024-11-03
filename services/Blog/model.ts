type BlogPost = {
  id: number;
  title: string;
  author: string;
  date: Date;
  content: string;
};

interface BlogPostService {
  getPosts(): Promise<BlogPost[]>;
  getPostById(id: number): Promise<BlogPost | undefined>;
  get3MostRecentPosts(): Promise<BlogPost[]>;
}

export type { BlogPost, BlogPostService };

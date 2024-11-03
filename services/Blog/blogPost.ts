import { db } from "../../database/database";
import type { BlogPost, BlogPostService } from "./model";

class BlogPostRepository {
  async getPosts(): Promise<BlogPost[]> {
    return await db("blog_posts").select("id", "title", "content", "date_published", "author");
  }

  async getPostById(id: number): Promise<BlogPost | null> {
    return await db("blog_posts").select("id", "title", "content", "date_published", "author").where({ id }).first() || null;
  }

  async get3MostRecentPosts(): Promise<BlogPost[]> {
    return await db("blog_posts")
      .select("id", "title", "content", "date_published", "author")
      .orderBy("date_published", "desc")
      .limit(3);
  }
}

class BlogPostServiceImpl implements BlogPostService {
  constructor(private repository: BlogPostRepository) {}

  async getPosts(): Promise<BlogPost[]> {
    return await this.repository.getPosts();
  }

  async getPostById(id: number): Promise<BlogPost | undefined> {
    const post = await this.repository.getPostById(id);
    return post === null ? undefined : post;
  }

  async get3MostRecentPosts(): Promise<BlogPost[]> {
    return await this.repository.get3MostRecentPosts();
  }
}
export { BlogPostRepository, BlogPostServiceImpl };

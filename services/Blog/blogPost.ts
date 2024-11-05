import { db } from "../../database/database";
import type { BlogPost, BlogPostService } from "./model";
class BlogPostRepository {
  async getPosts(): Promise<BlogPost[]> {
    try {
      return await db("blog_posts").select("id", "title", "content", "date_published", "author");
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Database error while fetching posts.");
    }
  }

  async getPostById(id: number): Promise<BlogPost | null> {
    try {
      return await db("blog_posts")
        .select("id", "title", "content", "date_published", "author")
        .where({ id })
        .first() || null;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw new Error("Database error while fetching the post.");
    }
  }

  async get3MostRecentPosts(): Promise<BlogPost[]> {
    try {
      return await db("blog_posts")
        .select("id", "title", "content", "date_published", "author")
        .orderBy("date_published", "desc")
        .limit(3);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw new Error("Database error while fetching recent posts.");
    }
  }
}


class BlogPostServiceImpl implements BlogPostService {
  constructor(private repository: BlogPostRepository) {}

  async getPosts(): Promise<BlogPost[]> {
    return await this.repository.getPosts();
  }

  async getPostById(id: number): Promise<BlogPost | null> {
    const post = await this.repository.getPostById(id);
    return post === null ? null : post;
  }

  async get3MostRecentPosts(): Promise<BlogPost[]> {
    return await this.repository.get3MostRecentPosts();
  }
}
export { BlogPostRepository, BlogPostServiceImpl };

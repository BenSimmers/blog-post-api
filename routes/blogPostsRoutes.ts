import { Router, type Request, type Response } from "express";
import type { BlogPostService } from "../services/Blog/model";

const router = Router();

export function createBlogPostRouter(blogPostService: BlogPostService) {
  router.get("/", async (req: Request, res: Response) => {
    try {
      const postList = await blogPostService.getPosts();
      return res.status(200).json(postList);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await blogPostService.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get("/recent", async (req: Request, res: Response) => {
    try {
      const recentPosts = await blogPostService.get3MostRecentPosts();
      return res.status(200).json(recentPosts);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
}

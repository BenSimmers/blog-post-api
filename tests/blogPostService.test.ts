import type { BlogPost } from "../services/Blog/model";
import { BlogPostServiceImpl } from "../services/Blog/blogPost";

import { describe, expect, test, jest, beforeEach, afterEach } from "bun:test";

// mock the repository
class MockBlogPostRepository {
  getPosts = jest.fn();
  getPostById = jest.fn();
  get3MostRecentPosts = jest.fn();
}

// tests
describe("BlogPostService", () => {
  let service: BlogPostServiceImpl;
  let mockRepository: MockBlogPostRepository;

  beforeEach(() => {
    mockRepository = new MockBlogPostRepository();
    service = new BlogPostServiceImpl(mockRepository);
  });

  test("getPosts calls repository", async () => {
    const posts: BlogPost[] = [
      {
        id: 1,
        title: "Post 1",
        date: new Date(),
        content: "Content 1",
        author: "Author 1",
      },
    ];

    mockRepository.getPosts.mockResolvedValue(posts);

    const result = await service.getPosts();

    expect(result).toEqual(posts);
    expect(mockRepository.getPosts).toHaveBeenCalledTimes(1);
  });

  test("getPostById calls repository", async () => {
    const post = {
      id: 1,
      title: "Post 1",
      date: new Date(),
      content: "Content 1",
      author: "Author 1",
    };

    mockRepository.getPostById.mockResolvedValue(post);

    const result = await service.getPostById(1);

    expect(result).toEqual(post || null);
    expect(mockRepository.getPostById).toHaveBeenCalledTimes(1);
  });

  test("there should be no post if the id is not found", async () => {
    mockRepository.getPostById.mockResolvedValue(null);

    const result = await service.getPostById(1);

    expect(result).toBeUndefined();
    expect(mockRepository.getPostById).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

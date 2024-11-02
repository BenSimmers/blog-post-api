import { Router, type Request, type Response } from "express";
import type { UserService } from "../services/Users/model";

const router = Router();

export function createUserRouter(userService: UserService) {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management API
   */

  /**
   * @swagger
   * /:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   age:
   *                     type: integer
   *       500:
   *         description: Internal Server Error
   */
  router.get("/", async (req: Request, res: Response) => {
    try {
      const userList = await userService.getUsers();
      return res.status(200).json(userList);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  /**
   * @swagger
   * /:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               age:
   *                 type: integer
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 age:
   *                   type: integer
   *       400:
   *         description: Bad Request
   */
  router.post("/", async (req: Request, res: Response) => {
    const { name, age } = req.body;
    try {
      const newUser = await userService.createUser(name, age);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  });

  /**
   * @swagger
   * /{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the user to retrieve
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 age:
   *                   type: integer
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
}

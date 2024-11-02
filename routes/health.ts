import { Router, type Request, type Response } from "express";
import { db } from "../database/database";

const router = Router();

export function createHealthRouter() {
  /**
   * @swagger
   * tags:
   *   name: Health
   *   description: Health check API
   *
   * /:
   *   get:
   *     summary: Check server and database health
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Health check successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 server:
   *                   type: boolean
   *                   description: Indicates if the server is healthy
   *                 db:
   *                   type: boolean
   *                   description: Indicates if the database is healthy
   *       503:
   *         description: Database unavailable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 server:
   *                   type: boolean
   *                 db:
   *                   type: boolean
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get("/", async (req: Request, res: Response) => {
    const serverAndDbHealth = {
      server: false,
      db: false,
    };

    try {
      await db.raw("SELECT 1");
      serverAndDbHealth.db = true;
    } catch (error) {
      console.error("Database health check failed:", error);
      return res
        .status(503)
        .json({ ...serverAndDbHealth, error: "Database unavailable" });
    }

    serverAndDbHealth.server = true;
    return res.status(200).json(serverAndDbHealth);
  });

  return router;
}

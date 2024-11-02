import { Router, type Request, type Response } from "express";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "../options";

const router = Router();

const specs = swaggerJsdoc(options);
router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

export default router;

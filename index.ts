import express, { type Request, type Response } from "express";

// middlewares
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import * as userServices from "./services/Users/users";

import { createUserRouter } from "./routes/userRoutes";
import { createHealthRouter } from "./routes/health";
import docsRoutes from "./routes/docs";
import errorHandler from "./util/errorHandler";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "8080") || 8080;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
        childSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        blockAllMixedContent: [],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(errorHandler);

// services
const userService = new userServices.UserServiceImpl();

// routes
const userRoutes = createUserRouter(userService);
const healthRoutes = createHealthRouter();

app.use("/users", userRoutes);
app.use("/", healthRoutes);
app.use("/docs", docsRoutes);

app.listen(port, (): void => {
  console.log(`Server started on http://localhost:${port}`);
});

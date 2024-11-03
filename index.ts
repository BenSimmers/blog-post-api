import express from "express";

// middlewares
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import * as blogPostServices from "./services/Blog/blogPost";

import { createBlogPostRouter } from "./routes/blogPostsRoutes";
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter);
app.use(errorHandler);

// services
const blogPostRepository = new blogPostServices.BlogPostRepository();
const blogPostService = new blogPostServices.BlogPostServiceImpl(blogPostRepository);

// routes
const blogRoutes = createBlogPostRouter(blogPostService);
const healthRoutes = createHealthRouter();

app.use("/blog", blogRoutes);
app.use("/", healthRoutes);
app.use("/docs", docsRoutes);

app.listen(port, (): void => {
  console.log(`Server started on http://localhost:${port}`);
});

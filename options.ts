const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bun Express Api Template",
      version: "0.1.0",
      description: "Documentation for the Bun Express Api Template",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: [
    "index.ts",
    "routes/userRoutes.ts",
    "routes/health.ts",
    "routes/docs.ts",
  ],
};

export default options;

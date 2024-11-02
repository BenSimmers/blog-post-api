// errorHandler.ts

import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
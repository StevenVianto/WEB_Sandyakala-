import express from "express";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "./utils/AppError.js";

const app = express();
const port = 3000;

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

// Global error handler
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
});

// 404 Not Found handler
app.use((_: Request, res: Response) => {
  res.status(404).json({
    message: "Resource Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

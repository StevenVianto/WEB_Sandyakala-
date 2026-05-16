import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "./common/utils/AppError.js";
import router from "./routes/index.js";
import multer from "multer";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api", router);

// Global error handler
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Multer
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Ukuran file terlalu besar. Maksimal 5MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: false,
    message: "Internal Server Error",
    // error_detail: err.message,
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

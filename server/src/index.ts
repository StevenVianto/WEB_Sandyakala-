import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { AppError } from "./common/utils/AppError.js";
import router from "./routes/index.js";

<<<<<<< HEAD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

=======
const port = process.env.PORT || 3000;
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
const app = express();
const port = process.env.PORT || 3000;

// --- CONFIG ---
const corsOptions = {
<<<<<<< HEAD
  origin: true,
=======
  origin: (_origin: any, callback: any) => {

    callback(null, true);
  },
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder statis untuk foto profil
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 

// --- ROUTER ---
app.get("/", (_: Request, res: Response) => {
  res.send("Server FreshStart Berjalan Lancar!");
});

app.use("/api", router);

// --- ERROR HANDLING ---
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error("Error Detail:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.code === "LIMIT_FILE_SIZE" ? "File terlalu besar (Max 5MB)." : err.message,
    });
  }

  return res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error_detail: err.message,
  });
});

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Resource Not Found" });
});

<<<<<<< HEAD
// --- LISTEN ---
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
=======
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
});
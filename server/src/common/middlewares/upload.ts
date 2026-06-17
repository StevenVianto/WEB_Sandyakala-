import multer from "multer";
import { BadRequestError } from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter = (
  _: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // --- UPDATE: Tambahkan MIME type untuk PDF dan Word ---
  const allowedMimeTypes = [
    "image/jpeg", 
    "image/jpg", 
    "image/png",
    "application/pdf", // untuk .pdf
    "application/msword", // untuk .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // untuk .docx
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        `File ${file.fieldname} tidak didukung. Hanya file JPG, PNG, PDF, atau DOC/DOCX yang diizinkan.`,
      ),
    );
  }
};

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas 5MB
  fileFilter: fileFilter,
});
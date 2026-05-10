import multer from "multer";
import { BadRequestError } from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter = (
  _: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        `File ${file.fieldname} not supported. Only JPG, JPEG or PNG files are allowed.`,
      ),
    );
  }
};

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

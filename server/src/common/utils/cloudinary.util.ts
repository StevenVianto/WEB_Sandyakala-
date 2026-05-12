import { v2 as cloudinary } from "cloudinary";
import { AppConfig } from "../../config/app.js";

cloudinary.config({
  cloud_name: AppConfig.CLOUDINARY_CLOUD_NAME,
  api_key: AppConfig.CLOUDINARY_API_KEY,
  api_secret: AppConfig.CLOUDINARY_API_SECRET,
});

const CloudinaryUtil = {
  uploadFile: async (file: Express.Multer.File, folderName: string) => {
    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: folderName,
        resource_type: "image",
      });

      return result.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload file.`);
    }
  },
};

export default CloudinaryUtil;

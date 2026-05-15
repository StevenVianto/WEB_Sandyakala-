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

  deleteFile: async (secureUrl: string, folderName: string): Promise<void> => {
    try {
      const urlParts = secureUrl.split("/");
      const fileNameWithExt = urlParts[urlParts.length - 1];
      const fileName = fileNameWithExt?.split(".")[0];

      const publicId = `${folderName}/${fileName}`;

      await cloudinary.uploader.destroy(publicId);
      console.log(`[Rollback] Berhasil menghapus ${publicId} dari Cloudinary`);
    } catch (error) {
      console.error(
        `[Rollback Failed] Gagal menghapus file dari Cloudinary: ${secureUrl}`,
        error,
      );
    }
  },
};

export default CloudinaryUtil;

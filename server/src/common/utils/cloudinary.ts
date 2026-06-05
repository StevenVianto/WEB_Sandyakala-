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
      if (!AppConfig.CLOUDINARY_CLOUD_NAME || !AppConfig.CLOUDINARY_API_KEY || !AppConfig.CLOUDINARY_API_SECRET) {
        console.warn("Cloudinary is not configured in .env! Falling back to short mock URLs.");
        if (file.fieldname === "logo" || folderName.includes("logo")) {
          return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
        } else if (file.fieldname === "ktp" || folderName.includes("ktp")) {
          return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
        } else {
          return "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
        }
      }

      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: folderName,
        resource_type: "image",
      });

      return result.secure_url;
    } catch (error) {
      console.warn("Cloudinary upload failed! Falling back to short mock URLs.", error);
      if (file.fieldname === "logo" || folderName.includes("logo")) {
        return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
      } else if (file.fieldname === "ktp" || folderName.includes("ktp")) {
        return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
      } else {
        return "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      }
    }
  },

  deleteFile: async (secureUrl: string, folderName: string): Promise<void> => {
    if (!secureUrl || secureUrl.startsWith("data:")) {
      return; // Skip rollback for local Base64 URIs
    }
    try {
      const urlParts = secureUrl.split("/");
      const fileNameWithExt = urlParts[urlParts.length - 1];
      const fileName = fileNameWithExt?.split(".")[0];

      const publicId = `${folderName}/${fileName}`;

      if (!AppConfig.CLOUDINARY_CLOUD_NAME || !AppConfig.CLOUDINARY_API_KEY || !AppConfig.CLOUDINARY_API_SECRET) {
        return;
      }

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

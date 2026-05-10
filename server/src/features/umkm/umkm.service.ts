import { BadRequestError } from "../../common/utils/AppError.js";
import CloudinaryUtil from "../../common/utils/cloudinary.util.js";
import { AppConfig } from "../../config/app.js";
import UmkmRepository from "./umkm.repository.js";
import type { RegisterUmkmInput } from "./umkm.schema.js";

const UmkmService = {
  registerUmkm: async (userId: number, data: RegisterUmkmInput, files: any) => {
    if (!files || !files.logo || !files.ktp || !files.nib_document) {
      throw new BadRequestError(
        "Documents (logo, ktp, nib) are required for UMKM registration.",
      );
    }

    const logoUrl = await CloudinaryUtil.uploadFile(
      files.logo[0],
      AppConfig.CLOUDINARY_FOLDER,
    );
    const ktpUrl = await CloudinaryUtil.uploadFile(
      files.ktp[0],
      AppConfig.CLOUDINARY_FOLDER,
    );
    const nibUrl = await CloudinaryUtil.uploadFile(
      files.nib_document[0],
      AppConfig.CLOUDINARY_FOLDER,
    );

    const documentUrls = {
      logo_url: logoUrl,
      ktp_url: ktpUrl,
      nib_file_url: nibUrl,
    };

    const umkmId = await UmkmRepository.createUmkmProfileAndDocs(
      userId,
      data,
      documentUrls,
    );

    return {
      umkm_id: umkmId,
      status: "PENDING",
    };
  },
};

export default UmkmService;

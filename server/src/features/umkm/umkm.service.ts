import { BadRequestError } from "../../common/utils/AppError.js";
import CloudinaryUtil from "../../common/utils/cloudinary.js";
import { AppConfig } from "../../config/app.js";
import UmkmRepository from "./umkm.repository.js";
import type { RegisterUmkmInput } from "./umkm.schema.js";

const UmkmService = {
  registerUmkm: async (userId: number, data: RegisterUmkmInput, files: any) => {
    if (!files || !files.logo || !files.ktp || !files.nib_document) {
      throw new BadRequestError("Documents (logo, ktp, nib) wajib diunggah");
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

    try {
      if (data.nib) {
        const isNibExists = await UmkmRepository.checkNibExists(data.nib);
        if (isNibExists) {
          throw new BadRequestError(
            "NIB ini sudah terdaftar. Silakan periksa kembali atau gunakan NIB lain.",
          );
        }
      }

      const umkmId = await UmkmRepository.createUmkmProfileAndDocs(
        userId,
        data,
        documentUrls,
      );

      return {
        umkm_id: umkmId,
        status: "PENDING",
      };
    } catch (error) {
      console.log(
        "Terjadi kegagalan di Database. Memulai proses Rollback Cloudinary...",
      );

      await Promise.all([
        CloudinaryUtil.deleteFile(logoUrl, AppConfig.CLOUDINARY_FOLDER),
        CloudinaryUtil.deleteFile(ktpUrl, AppConfig.CLOUDINARY_FOLDER),
        CloudinaryUtil.deleteFile(nibUrl, AppConfig.CLOUDINARY_FOLDER),
      ]);

      throw error;
    }
  },

  getAllUmkm: async () => {
    const umkms = (await UmkmRepository.findAllUmkm()) as any[];
    for (const umkm of umkms) {
      umkm.reviews = await UmkmRepository.getReviewsByUmkmId(umkm.id_umkm);
    }
    return umkms;
  },

  getUmkmByUserId: async (userId: number) => {
    const umkm = await UmkmRepository.findUmkmByUserId(userId);
    if (umkm) {
      umkm.reviews = await UmkmRepository.getReviewsByUmkmId(umkm.id_umkm);
    }
    return umkm;
  },

  updateUmkmStatus: async (umkmId: number, status: string) => {
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      throw new BadRequestError("Status verifikasi tidak valid");
    }

    const umkm = await UmkmRepository.findUmkmById(umkmId);
    if (!umkm) {
      throw new BadRequestError("Profil UMKM tidak ditemukan");
    }

    await UmkmRepository.updateStatus(umkmId, status);
    
    // Auto-update user's role on database
    if (status === "APPROVED") {
      await UmkmRepository.updateUserRole(umkm.user_id, "UMKM");
    } else if (status === "REJECTED" || status === "PENDING") {
      await UmkmRepository.updateUserRole(umkm.user_id, "USER");
    }

    return { umkm_id: umkmId, status };
  },
};

export default UmkmService;

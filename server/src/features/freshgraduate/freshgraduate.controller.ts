import type { Request, Response } from "express";
import FreshGraduateService from "./freshgraduate.service.js";

const FreshGraduateController = {
  list: async (_: Request, res: Response) => {
    const result = await FreshGraduateService.getAllProfiles();
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  detail: async (req: Request, res: Response) => {
    const email = req.params.email as string;
    const result = await FreshGraduateService.getProfileByEmail(email);
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  updateStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    const result = await FreshGraduateService.updateProfileStatus(
      Number(id),
      status,
      rejection_reason || null
    );

    res.status(200).json({
      success: true,
      message: `Status verifikasi fresh graduate berhasil diubah menjadi ${status}.`,
      data: result,
    });
  },

  myProfile: async (req: Request, res: Response) => {
    const userId = req.user.id;
    const result = await FreshGraduateService.getMyProfile(Number(userId));
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  upsertProfile: async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { last_education, lastEducation, no_hp, phone } = req.body;

    const targetEducation = last_education || lastEducation;
    const targetPhone = no_hp || phone;

    const result = await FreshGraduateService.upsertProfile(
      Number(userId),
      { lastEducation: targetEducation, phone: targetPhone },
      req.files
    );

    res.status(201).json({
      success: true,
      message: "Profil Fresh Graduate berhasil disimpan dan sedang dalam antrean verifikasi.",
      data: result,
    });
  },
};

export default FreshGraduateController;

import type { Request, Response } from "express";
import SkillRepository from "./skill.repository.js";

const SkillController = {
  getAll: async (_: Request, res: Response) => {
    const skills = await SkillRepository.getAllSkills();
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data skills",
      data: skills,
    });
  },
};

export default SkillController;

import pool from "../../config/db.js";

const SkillRepository = {
  getAllSkills: async () => {
    const [rows] = await pool.execute(
      "SELECT id, skill_name FROM skills ORDER BY skill_name ASC",
    );
    return rows;
  },
};

export default SkillRepository;

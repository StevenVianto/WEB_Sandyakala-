import pool from "../../config/db.js";
import type { CreateJobInput } from "./job.schema.js";

const JobRepository = {
  createJob: async (
    umkmId: number,
    data: CreateJobInput,
    uniqueSkills: string[],
  ) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const queryJob = `
        INSERT INTO jobs 
        (umkm_id, title, job_category, description, type, salary_min, salary_max, worker_needed, minimum_education, qualification_description, portfolio_requirement, deadline, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const [jobResult] = await connection.execute(queryJob, [
        umkmId,
        data.title,
        data.job_category,
        data.description,
        data.type,
        data.salary_min || null,
        data.salary_max || null,
        data.worker_needed,
        data.minimum_education,
        data.qualification_description,
        data.portfolio_requirement,
        data.deadline,
      ]);

      const jobId = (jobResult as any).insertId;

      const skillIds: number[] = [];

      for (const skillName of uniqueSkills) {
        const [existingSkill]: any = await connection.execute(
          "SELECT id FROM skills WHERE LOWER(skill_name) = ?",
          [skillName.toLowerCase()],
        );

        if (existingSkill.length > 0) {
          skillIds.push(existingSkill[0].id);
        } else {
          const [newSkill]: any = await connection.execute(
            "INSERT INTO skills (skill_name) VALUES (?)",
            [skillName],
          );
          skillIds.push(newSkill.insertId);
        }
      }

      if (skillIds.length > 0) {
        const skillPlaceholders = skillIds.map(() => "(?, ?)").join(", ");
        const skillParams = skillIds.flatMap((skillId) => [jobId, skillId]);

        await connection.execute(
          `INSERT INTO job_skills (job_id, skill_id) VALUES ${skillPlaceholders}`,
          skillParams,
        );
      }

      if (data.type === "SHIFT" && data.shifts) {
        const shiftPlaceholders = data.shifts.map(() => "(?, ?)").join(", ");
        const shiftParams = data.shifts.flatMap((shiftType) => [
          jobId,
          shiftType,
        ]);

        await connection.execute(
          `INSERT INTO job_shifts (job_id, shift_type) VALUES ${shiftPlaceholders}`,
          shiftParams,
        );
      } else if (data.type === "PROJECT" && data.project_tasks) {
        const taskPlaceholders = data.project_tasks
          .map(() => "(?, ?, ?, NOW())")
          .join(", ");
        const taskParams = data.project_tasks.flatMap((task) => [
          jobId,
          task.task_name,
          task.task_order,
        ]);

        await connection.execute(
          `INSERT INTO job_project_tasks (job_id, task_name, task_order, created_at) VALUES ${taskPlaceholders}`,
          taskParams,
        );
      }

      await connection.commit();
      return jobId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default JobRepository;

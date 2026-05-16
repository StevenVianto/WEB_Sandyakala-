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

  getJobById: async (jobId: number) => {
    const queryJob = `
      SELECT 
        j.*, 
        u.business_name, 
        d.logo_url, 
        u.business_address 
      FROM jobs j
      JOIN umkm_profiles u ON j.umkm_id = u.id_umkm
      JOIN umkm_documents d ON j.umkm_id = d.umkm_id -- Ambil logo dari tabel dokumen
      WHERE j.id = ?
    `;
    const [jobRows]: any = await pool.execute(queryJob, [jobId]);

    if (jobRows.length === 0) return null;

    const jobData = jobRows[0];

    const querySkills = `
      SELECT s.id, s.skill_name 
      FROM skills s
      JOIN job_skills js ON s.id = js.skill_id
      WHERE js.job_id = ?
    `;
    const [skillRows]: any = await pool.execute(querySkills, [jobId]);

    let shifts: string[] = [];
    let projectTasks: any[] = [];

    if (jobData.type === "SHIFT") {
      const [shiftRows]: any = await pool.execute(
        "SELECT shift_type FROM job_shifts WHERE job_id = ?",
        [jobId],
      );
      shifts = shiftRows.map((row: any) => row.shift_type);
    } else if (jobData.type === "PROJECT") {
      const [taskRows]: any = await pool.execute(
        "SELECT id, task_name, task_order FROM job_project_tasks WHERE job_id = ? ORDER BY task_order ASC",
        [jobId],
      );
      projectTasks = taskRows;
    }

    return {
      ...jobData,
      skills: skillRows,
      shifts: shifts.length > 0 ? shifts : undefined,
      project_tasks: projectTasks.length > 0 ? projectTasks : undefined,
    };
  },
};

export default JobRepository;

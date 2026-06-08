import pool from "../../config/db.js";

export interface InsertReportParams {
  userId: number;
  jobId: number;
  category: string;
  detail: string;
  evidenceUrl: string | null;
}

interface FindAllParams {
  page: number;
  limit: number;
}

const ReportRepository = {
  checkExistingReport: async (userId: number, jobId: number) => {
    const query = `
      SELECT id FROM reports 
      WHERE user_id = ? AND job_id = ? 
      LIMIT 1
    `;
    const [rows] = await pool.query(query, [userId, jobId]);
    return (rows as any[]).length > 0;
  },

  createReport: async (data: InsertReportParams) => {
    const query = `
      INSERT INTO reports (user_id, job_id, category, detail, evidence_url, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.userId,
      data.jobId,
      data.category,
      data.detail,
      data.evidenceUrl,
    ];

    const [result] = await pool.query(query, values);
    return result;
  },

  findAll: async (filters: FindAllParams) => {
    const { page, limit } = filters;
    const offset = (page - 1) * limit;

    const query = `
      SELECT id, user_id AS userId, job_id AS jobId, category, detail, evidence_url AS evidenceUrl, status, created_at AS createdAt 
      FROM reports 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const [rows] = await pool.query(query, [limit, offset]);

    const countQuery = `SELECT COUNT(*) AS total FROM reports`;
    const [countResult] = await pool.query(countQuery);
    const totalData = (countResult as any[])[0].total;

    return {
      data: rows,
      meta: {
        page,
        limit,
        totalData,
        totalPage: Math.ceil(totalData / limit),
      },
    };
  },
};

export default ReportRepository;

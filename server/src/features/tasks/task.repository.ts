import pool from "../../config/db.js";

const STATUS = {
  REVIEW: "REVIEW",
  REVISI: "REVISI",
  SELESAI: "SELESAI",
} as const;

const TaskRepository = {
  getTasksByJobId: async (jobId: number) => {
    const query = `
      SELECT 
        id, 
        task_name, 
        task_order, 
        project_start, 
        project_end, 
        status, 
        submission_link, 
        revision_note
      FROM job_project_tasks
      WHERE job_id = ?
      ORDER BY task_order ASC
    `;
    const [rows] = await pool.execute(query, [jobId] as any[]);
    return rows;
  },

  getTaskById: async (taskId: number) => {
    const query = `
      SELECT id, job_id, status 
      FROM job_project_tasks 
      WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [taskId] as any[]);
    return (rows as any[])[0];
  },

  checkUserApplication: async (userId: number, jobId: number) => {
    const query = `
      SELECT id, status 
      FROM applications 
      WHERE user_id = ? AND job_id = ? AND status = 'ACCEPTED'
    `;
    const [rows] = await pool.execute(query, [userId, jobId] as any[]);
    return (rows as any[])[0];
  },

  updateTaskSubmit: async (taskId: number, submissionLink: string) => {
    const query = `
      UPDATE job_project_tasks 
      SET submission_link = ?, status = ?
      WHERE id = ?
    `;
    await pool.execute(query, [submissionLink, STATUS.REVIEW, taskId] as any[]);
  },

  updateTaskReview: async (
    taskId: number,
    status: string,
    revisionNote: string | null,
  ) => {
    const query = `
      UPDATE job_project_tasks 
      SET status = ?, revision_note = ?
      WHERE id = ?
    `;
    await pool.execute(query, [status, revisionNote, taskId] as any[]);
  },

  createRevisionHistory: async (
    taskId: number,
    submittedBy: number,
    submissionLink: string,
    note?: string,
  ) => {
    const query = `
      INSERT INTO task_revisions (task_id, submitted_by, submission_link, note, status, submitted_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    await pool.execute(query, [
      taskId,
      submittedBy,
      submissionLink,
      note || null,
      STATUS.REVIEW,
    ] as any[]);
  },

  getRevisionsByTaskId: async (taskId: number) => {
    const query = `
      SELECT 
        tr.id,
        tr.submission_link,
        tr.note,
        tr.revision_note,
        tr.status,
        tr.submitted_at,
        u.fullname AS submitted_by_name
      FROM task_revisions tr
      JOIN users u ON tr.submitted_by = u.id
      WHERE tr.task_id = ?
      ORDER BY tr.submitted_at DESC
    `;
    const [rows] = await pool.execute(query, [taskId] as any[]);
    return rows;
  },

  updateLatestRevisionNote: async (
    taskId: number,
    status: string,
    revisionNote: string | null,
  ) => {
    const query = `
      UPDATE task_revisions
      SET status = ?, revision_note = ?
      WHERE task_id = ?
      ORDER BY submitted_at DESC
      LIMIT 1
    `;
    await pool.execute(query, [status, revisionNote, taskId] as any[]);
  },
};

export { STATUS };
export default TaskRepository;
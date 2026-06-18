import TaskRepository, { STATUS } from "./task.repository.js";
import type { SubmitTaskInput, ReviewTaskInput } from "./task.schema.js";

const TaskService = {
  getTasksByJobId: async (jobId: number) => {
    return await TaskRepository.getTasksByJobId(jobId);
  },

  submitTask: async (
    taskId: number,
    userId: number,
    data: SubmitTaskInput,
  ) => {
    const task = await TaskRepository.getTaskById(taskId);

    if (!task) {
      throw new Error("Tugas tidak ditemukan!");
    }

    if (task.status === STATUS.SELESAI || task.status === STATUS.REVIEW) {
      throw new Error("Tugas sudah selesai atau sedang dalam review.");
    }

    const application = await TaskRepository.checkUserApplication(
      userId,
      task.job_id,
    );

    if (!application) {
      throw new Error(
        "Akses ditolak: Anda tidak terdaftar atau belum diterima pada lowongan ini.",
      );
    }

    await TaskRepository.createRevisionHistory(
      taskId,
      userId,
      data.submission_link,
      data.note,
    );

    await TaskRepository.updateTaskSubmit(taskId, data.submission_link);
  },

  reviewTask: async (taskId: number, data: ReviewTaskInput) => {
    const task = await TaskRepository.getTaskById(taskId);

    if (!task) {
      throw new Error("Tugas tidak ditemukan!");
    }

    if (task.status !== STATUS.REVIEW && task.status !== STATUS.REVISI) {
      throw new Error("Tugas ini tidak dalam status menunggu tinjauan.");
    }

    const status = data.is_approved ? STATUS.SELESAI : STATUS.REVISI;
    const finalNote = data.is_approved ? null : (data.revision_note ?? null);

    await TaskRepository.updateTaskReview(taskId, status, finalNote);

    await TaskRepository.updateLatestRevisionNote(taskId, status, finalNote);
  },

  getTaskRevisions: async (taskId: number) => {
    const task = await TaskRepository.getTaskById(taskId);

    if (!task) {
      throw new Error("Tugas tidak ditemukan!");
    }

    return await TaskRepository.getRevisionsByTaskId(taskId);
  },
};

export default TaskService;

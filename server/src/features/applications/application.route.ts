import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
<<<<<<< HEAD
import { safeGuard } from "../../common/middlewares/safeGuard.js";
import ApplicationController from "./application.controller.js";
=======
import ApplicationController from "./application.controller.js";
import { safeGuard } from "../../common/middlewares/safeGuard.js";
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065

const applicationRouter = Router();

applicationRouter.get(
<<<<<<< HEAD
  "/stats",
  safeGuard(["USER"]),
  asyncHandler(ApplicationController.getStats),
);

export default applicationRouter;
=======
  "/umkm",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.getUmkmApplicants),
);

applicationRouter.get(
  "/umkm/interviews",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.getInterviews),
);

applicationRouter.get(
  "/umkm/workers",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.getWorkers),
);

applicationRouter.patch(
  "/interviews/:id/status",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.updateInterviewStatus),
);

applicationRouter.post(
  "/:jobId/apply",
  safeGuard(["USER"]),
  asyncHandler(ApplicationController.apply),
);

applicationRouter.patch(
  "/:id/reject",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.rejectApplication),
);

applicationRouter.post(
  "/:id/schedule-interview",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.scheduleInterview),
);

applicationRouter.patch(
  "/:id/accept",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.acceptApplicant),
);

applicationRouter.patch(
  "/workers/:id/status",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.updateEmployeeStatus),
);

export default applicationRouter;
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065

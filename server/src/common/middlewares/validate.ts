import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

type ValidationSource = "body" | "query" | "params";

export const validate =
  <T>(schema: ZodType<T>, source: ValidationSource = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[source] ?? {};
      const parsed = await schema.parseAsync(dataToValidate);

      (req as any)[source] = parsed;

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        // --- INI KODE DETEKTIF ---
        // Kita paksa server mencetak error-nya ke terminal supaya kamu bisa lihat
        console.error("!!! VALIDATION FAILED !!!");
        console.error(JSON.stringify(err.issues, null, 2));
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // -------------------------

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      return next(err);
    }
  };
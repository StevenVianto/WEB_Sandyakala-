import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import type { Roles, TokenPayload } from "../../types/user.js";
import pool from "../../config/db.js";

export const safeGuard = (allowedRoles: Roles[keyof Roles][] = []) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Unauthorized: No token provided."));
      }

      const token = authHeader.split(" ")[1] as string;
      const decoded = verifyToken(token) as TokenPayload;

      // Ambil role terbaru dari database untuk sinkronisasi jika role berubah (misal: dari USER ke UMKM setelah diverifikasi)
      const [userRows]: any = await pool.execute(
        "SELECT role FROM users WHERE id = ?",
        [decoded.id]
      );
      
      const dbRole = userRows[0]?.role;
      const currentRole = (dbRole || decoded.role).toUpperCase() as Roles[keyof Roles];

      if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
        return next(new UnauthorizedError("Forbidden: Access denied."));
      }

      req.user = {
        ...decoded,
        role: currentRole
      };
      next();
    } catch (error) {
      return next(new UnauthorizedError("Invalid token or token has expired."));
    }
  };
};

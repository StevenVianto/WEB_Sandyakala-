import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import type { Roles, TokenPayload } from "../../types/user.js";

export const safeGuard = (allowedRoles: Roles[keyof Roles][] = []) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Unauthorized: No token provided."));
      }

      const token = authHeader.split(" ")[1] as string;
      const decoded = verifyToken(token) as TokenPayload;

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return next(new UnauthorizedError("Forbidden: Access denied."));
      }

      req.user = decoded;
      next();
    } catch (error) {
      return next(new UnauthorizedError("Invalid token or token has expired."));
    }
  };
};

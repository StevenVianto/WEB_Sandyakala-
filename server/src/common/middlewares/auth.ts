import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/AppError.js";
import { verifyToken, type TokenPayload } from "../utils/jwt.utils.js";

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Unauthorized: No token provided."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token as string) as TokenPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return next(new UnauthorizedError("Invalid token or token has expired."));
  }
};

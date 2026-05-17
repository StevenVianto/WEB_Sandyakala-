import type { TokenPayload } from "../common/utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Type Augmentation
    }
  }
}

export {};

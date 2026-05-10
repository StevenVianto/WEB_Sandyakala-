import type { TokenPayload } from "../common/utils/jwt.utils.ts";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Type Augmentation
    }
  }
}

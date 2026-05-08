import pool from "../../config/db.js";
import type { UserType } from "./auth.type.js";

export const AuthRepository = {
  async findAll(): Promise<UserType[]> {
    const [rows] = await pool.query<UserType[]>("SELECT * FROM users");
    return rows;
  },
};

import mysql from "mysql2/promise";
import { AppConfig } from "./app.js";

const pool = process.env.DATABASE_URL
  ? mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  : mysql.createPool({
      host: AppConfig.DB_HOST,
      user: AppConfig.DB_USER,
      password: AppConfig.DB_PASSWORD,
      database: AppConfig.DB_NAME,
      port: AppConfig.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

export default pool;

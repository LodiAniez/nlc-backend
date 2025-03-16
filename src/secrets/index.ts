import { config } from "dotenv";
config();

export const PORT = process.env["PORT"] || 3000;

export const ACCESS_TOKEN_SECRET_KEY =
  process.env["ACCESS_TOKEN_SECRET_KEY"] || "";
export const REFRESH_TOKEN_SECRET_KEY =
  process.env["REFRESH_TOKEN_SECRET_KEY"] || "";

export const DEFAULT_USER_EMAIL = process.env["DEFAULT_USER_EMAIL"] || "";
export const DEFAULT_USER_PASSWORD = process.env["DEFAULT_USER_PASSWORD"] || "";

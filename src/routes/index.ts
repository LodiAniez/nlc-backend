import { Express } from "express";

import AuthController from "@controllers/auth/auth.controller";

export const router = (app: Express) => {
  app.use("/auth", AuthController);
};

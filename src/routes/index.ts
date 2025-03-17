import { Express } from "express";

import { authMiddleware } from "@middlewares/auth";
import AuthController from "@controllers/auth/auth.controller";
import ProjectController from "@controllers/project/project.controller";
import ServiceOrderController from "@controllers/service-order/service-order.controller";

export const router = (app: Express) => {
  app.use("/auth", AuthController);

  app.use("/project", authMiddleware, ProjectController);
  app.use("/service-order", authMiddleware, ServiceOrderController);
};

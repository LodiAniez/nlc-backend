import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "@globals/utils";
import { ACCESS_TOKEN_SECRET_KEY } from "@secrets/index";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader ? authHeader.split(" ")[1] : "";

  try {
    const decoded = jwt.verify(String(token), ACCESS_TOKEN_SECRET_KEY);
    req["user"] = decoded;
    next();
  } catch (error) {
    const errorMessage = handleError(error);
    res.status(401).json({ message: errorMessage });
  }
};

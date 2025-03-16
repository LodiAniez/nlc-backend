import { Router } from "express";
import { Login } from "./auth.types";
import { useAuthService } from "./auth.service";
import { CustomRequest } from "@globals/types";
import { handleError } from "@globals/utils";
import { NODE_ENV } from "@secrets/index";
import { Environment } from "@constants/environment";

const app = Router();

const { login } = useAuthService();

app.post("/login", (req: CustomRequest<Login>, res) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = login({ email, password });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: NODE_ENV === Environment.Development,
      secure: NODE_ENV === Environment.Production,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    const message = handleError(error);
    res.status(401).json({ message });
  }
});

export default app;

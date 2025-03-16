import { Login } from "./auth.types";
import { sign } from "jsonwebtoken";

import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
} from "@secrets/index";

export const useAuthService = () => {
  const defaultCredentials = {
    email: DEFAULT_USER_EMAIL,
    password: DEFAULT_USER_PASSWORD,
  } as const;

  /**
   *
   * @param email - user email
   * @param password - user password
   * @returns access and refresh token to be used for authentication in every request
   */
  const login = ({ email, password }: Login) => {
    if (
      email !== defaultCredentials.email ||
      password !== defaultCredentials.password
    ) {
      throw new Error("Invalid credentials");
    }

    const accessToken = sign(defaultCredentials, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "15m",
    });

    const refreshToken = sign(defaultCredentials, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    return {
      accessToken,
      refreshToken,
    };
  };

  return {
    login,
  };
};

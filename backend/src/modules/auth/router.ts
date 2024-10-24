/**
 * This file contains all routes related to authentication
 */

import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "./controller";

function createAuthRouter() {
  const router = Router();
  router.post("/register", registerController);
  router.post("/login", loginController);
  router.post("/logout", logoutController);

  return router;
}

export const authRouter = createAuthRouter();

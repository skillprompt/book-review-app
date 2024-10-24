import { Request, Response, NextFunction } from "express";
import { APIError } from "src/utils/error";
import { LoginControllerSchema, RegisterControllerSchema } from "./validation";
import { createUserService, loginService } from "./service";
import { TTokenPayload, verifyToken } from "src/utils/auth";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = RegisterControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const user = await createUserService(data);

    res.status(201).json({
      message: "User registered successfully",
      isSuccess: true,
      data: {
        username: user.username,
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = LoginControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const loginOutput = await loginService(data);

    res.cookie("token", loginOutput.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
      path: "/",
    });

    res.status(200).json({
      message: "User logged in successfully",
      isSuccess: true,
      data: loginOutput,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.headers["cookie"];

  if (!cookie || !cookie.includes("token") || !cookie.includes("=")) {
    res.status(401).json({
      message: "Cookie not found or is invalid",
      isSuccess: false,
      data: null,
    });
    return;
  }

  const token = cookie.split("=")[1];

  if (!token) {
    res.status(401).json({
      message: "Token not found or is invalid",
      isSuccess: false,
      data: null,
    });
    return;
  }

  const verifyTokenOutput = verifyToken(token);

  if (!verifyTokenOutput.isValid) {
    res.status(401).json({
      message: verifyTokenOutput.message,
      isSuccess: false,
      data: null,
    });
    return;
  }

  if (!verifyTokenOutput.payload) {
    res.status(401).json({
      message: "Invalid token",
      isSuccess: false,
      data: null,
    });
    return;
  }

  const payload = verifyTokenOutput.payload as TTokenPayload;

  req.user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
  };

  next();
}

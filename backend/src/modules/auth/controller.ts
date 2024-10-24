import { Request, Response, NextFunction } from "express";
import { APIError } from "src/utils/error";
import { RegisterControllerSchema } from "./validation";
import { createUserService } from "./service";

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

export function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

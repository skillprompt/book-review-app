import { Request, Response, NextFunction } from "express";
import { APIError } from "src/utils/error";

export function registerController(
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

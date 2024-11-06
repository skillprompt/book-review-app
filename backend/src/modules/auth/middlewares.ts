import { Request, Response, NextFunction } from "express";
import { TTokenPayload, verifyToken } from "src/utils/auth";

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

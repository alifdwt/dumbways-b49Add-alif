import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Anda tidak diizinkan untuk mengubah data!",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const loginSession = jwt.verify(token, "misteri-ilahi");
    res.locals.loginSession = loginSession;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Anda tidak diizinkan untuk mengubah data!",
    });
  }
}

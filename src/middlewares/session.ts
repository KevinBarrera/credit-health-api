import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/authenticatedRequest.interface";
import { verifyToken } from "../utils/jwt.handle";

const validateJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtReceived = req.headers.authorization ?? null;
    const jwt = jwtReceived?.split(" ").pop() ?? "";
    const sessionData = verifyToken(jwt) as JwtPayload;

    if (!sessionData) {
      res.status(401).send({
        message: "Invalid token.",
        data: null,
        error: null
      });
    }

    const now = Date.now() / 1000;
    if (sessionData.iat && sessionData.iat > now) {
      res.status(401).send({
        message: "Invalid token. Issued in the future.",
        data: null,
        error: null
      });
    }
    if (sessionData.exp && sessionData.exp <= now) {
      res.status(401).send({
        message: "Token has expired. Please reauthenticate.",
        data: null,
        error: null
      });
    }

    req.session = sessionData;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Invalid token.",
      data: null,
      error
    });
  }
};

export { validateJwt };

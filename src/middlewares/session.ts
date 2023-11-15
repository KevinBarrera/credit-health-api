import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/authenticatedRequest.interface";
import { handleHttp } from "../utils/error.handle";
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
        error: "Invalid token. Please reauthenticate to obtain a valid one."
      });
    }
    const now = Date.now() / 1000;
    if (sessionData.iat && sessionData.iat > now) {
      res.status(401).send({
        message: "Invalid token.",
        data: null,
        error: "Invalid token. Issued in the future."
      });
    }
    if (sessionData.exp && sessionData.exp <= now) {
      res.status(401).send({
        message: "Invalid token.",
        data: null,
        error: "Token has expired. Please reauthenticate."
      });
    }

    req.session = sessionData;

    next();
  } catch (error) {
    handleHttp(res, error);
  }
};

export { validateJwt };

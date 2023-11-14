import { Request, Response } from "express";
import { LoginSchemaBody, RegisterSchemaBody } from "../schemas/auth.schemas";
import { loginUser, registerNewUser } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

const register = async (
  req: Request<unknown, unknown, RegisterSchemaBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await registerNewUser(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

const login = async (
  req: Request<unknown, unknown, LoginSchemaBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await loginUser(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { register, login };

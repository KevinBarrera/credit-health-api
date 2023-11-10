import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

const register = async ({ body }: Request, res: Response) => {
  try {
    const { status, message, data, error } = await registerNewUser(body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

const login = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const { status, message, data, error } = await loginUser({
      email,
      password
    });
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { register, login };

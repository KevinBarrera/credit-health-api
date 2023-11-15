import { Request, Response } from "express";
import { EmailBody } from "../schemas/email.schemas";
import { ResetPasswordBody } from "../schemas/forgotPassword.schemas";
import {
  resetUserPassword,
  sendForgotPasswordOtpCodeEmail
} from "../services/forgotPassword";
import { handleHttp } from "../utils/error.handle";

const sendForgotPasswordOtpEmail = async (
  req: Request<unknown, unknown, EmailBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } =
      await sendForgotPasswordOtpCodeEmail(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

const resetPassword = async (
  req: Request<unknown, unknown, ResetPasswordBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await resetUserPassword(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { sendForgotPasswordOtpEmail, resetPassword };

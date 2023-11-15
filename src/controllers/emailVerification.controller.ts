import { Request, Response } from "express";
import { EmailBody } from "../schemas/email.schemas";
import { VerifyOtpBody } from "../schemas/otp.schemas";
import {
  sendVerificationOtpEmailCode,
  verifyUserEmailWithOtp
} from "../services/emailVerification";
import { handleHttp } from "../utils/error.handle";

const sendVerificationOtpEmail = async (
  req: Request<unknown, unknown, EmailBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await sendVerificationOtpEmailCode(
      req.body
    );
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

const verifyUserEmail = async (
  req: Request<unknown, unknown, VerifyOtpBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await verifyUserEmailWithOtp(
      req.body
    );
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { sendVerificationOtpEmail, verifyUserEmail };

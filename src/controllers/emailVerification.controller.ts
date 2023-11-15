import { Request, Response } from "express";
import { EmailVerificationBody } from "../schemas/emailVerification.schemas";
import { VerifyOtpBody } from "../schemas/otp.schemas";
import {
  sendVerificationOtpEmailCode,
  verifyUserEmailWithOtp
} from "../services/emailVerification";
import { handleHttp } from "../utils/error.handle";

const sendVerificationOtpEmail = async (
  req: Request<unknown, unknown, EmailVerificationBody>,
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

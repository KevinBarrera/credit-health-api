import dotenv from "dotenv";
import { Request, Response } from "express";
import { EmailContentBody, VerifyOtpBody } from "../schemas/otp.schemas";
import { sendOtpCode, verifyOtpCode } from "../services/otp";
import { handleHttp } from "../utils/error.handle";

dotenv.config();

const sendOtp = async (
  req: Request<unknown, unknown, EmailContentBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await sendOtpCode(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

const verifyOtp = async (
  req: Request<unknown, unknown, VerifyOtpBody>,
  res: Response
) => {
  try {
    const { status, message, data, error } = await verifyOtpCode(req.body);
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { sendOtp, verifyOtp };

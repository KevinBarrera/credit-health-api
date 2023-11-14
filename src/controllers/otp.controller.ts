import dotenv from "dotenv";
import { Request, Response } from "express";
import { sendOtpCode } from "../services/otp";
import { handleHttp } from "../utils/error.handle";

dotenv.config();

const sendOtp = async ({ body }: Request, res: Response) => {
  try {
    const { email, subject, message: msj, duration } = body;
    const { status, message, data, error } = await sendOtpCode(
      email,
      subject,
      msj,
      duration
    );
    res.status(status).send({ message, data, error });
  } catch (error) {
    handleHttp(res, error);
  }
};

export { sendOtp };

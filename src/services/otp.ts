import { Options } from "nodemailer/lib/sendmail-transport";
import { Otp } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { EmailContentBody, VerifyOtpBody } from "../schemas/otp.schemas";
import { sendEmail } from "../utils/email.handle";
import { encrypt, verify } from "../utils/encryption.handle";
import { generateOtp } from "../utils/otp.handle";

const sendOtpCode = async (
  data: EmailContentBody
): Promise<ApiResponse<OtpData>> => {
  try {
    const { email, subject, message, duration } = data;

    await Otp.destroy({
      where: {
        email
      }
    });

    const otp = generateOtp();

    const mailOptions: Options = {
      from: process.env.SMTP_EMAIL ?? "kev97barrera@gmail.com",
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:4px;"><b>${otp}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
      sendmail: true
    };

    await sendEmail(mailOptions);

    const hashedOtp = await encrypt(otp);

    const newOtp = await Otp.create({
      email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * duration
    });

    return {
      status: 201,
      message: "OTP code was successfully sent",
      error: null,
      data: newOtp
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

const verifyOtpCode = async (
  data: VerifyOtpBody
): Promise<ApiResponse<{ isOtpValid: boolean }>> => {
  try {
    const { email, otp } = data;
    const matchedOtpRecord = await Otp.findOne({ where: { email } });

    if (!matchedOtpRecord) {
      return {
        status: 404,
        message: "No OTP record found.",
        error: `OTP ${otp} does not exist.`,
        data: null
      };
    }

    const { expiresAt } = matchedOtpRecord;
    if (expiresAt.getTime() < Date.now()) {
      await Otp.destroy({ where: { email } });
      return {
        status: 401,
        message: "The OTP has expired. Please request a new one.",
        error: `OTP ${otp} is not valid. It has expired.`,
        data: null
      };
    }

    const { otp: hashedOtp } = matchedOtpRecord;
    const doesOtpMatch = await verify(otp, hashedOtp);
    return {
      status: 200,
      message: `OTP ${otp} is ${doesOtpMatch ? "valid" : "not valid"}.`,
      error: null,
      data: {
        isOtpValid: doesOtpMatch
      }
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { sendOtpCode, verifyOtpCode };

import { Options } from "nodemailer/lib/sendmail-transport";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { sendEmail } from "../utils/email.handle";
import { encrypt } from "../utils/encryption.handle";
import { generateOtp } from "../utils/otpSystem";
import { Otp } from "./associations";

const sendOtpCode = async (
  email: string,
  subject: string,
  message: string,
  duration = 1
): Promise<ApiResponse<OtpData>> => {
  try {
    if (!(email && subject && message)) {
      return {
        status: 400,
        message: "Missing fields.",
        data: null,
        error: null
      };
    }

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
      expiresAt: Date.now() + 3600000 * Number(duration)
    });

    return {
      status: 201,
      message: "Confirmation code was successfully sent",
      error: null,
      data: newOtp
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { sendOtpCode };

import { Options } from "nodemailer/lib/sendmail-transport";
import { Otp } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { EmailContentBody } from "../schemas/otp.schemas";
import { sendEmail } from "../utils/email.handle";
import { encrypt } from "../utils/encryption.handle";
import { generateOtp } from "../utils/otp.handle";

const sendOtpCode = async (
  content: EmailContentBody
): Promise<ApiResponse<OtpData>> => {
  try {
    const { email, subject, message, duration } = content;
    console.table(content);

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
      message: "Confirmation code was successfully sent",
      error: null,
      data: newOtp
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { sendOtpCode };

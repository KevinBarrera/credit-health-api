import { Otp, User } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { EmailBody } from "../schemas/email.schemas";
import { EmailContentBody, VerifyOtpBody } from "../schemas/otp.schemas";
import { sendOtpCode, verifyOtpCode } from "./otp";

const sendVerificationOtpEmailCode = async ({
  email
}: EmailBody): Promise<ApiResponse<OtpData>> => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return {
        status: 404,
        message: "There is no account for the provided email.",
        error: `There is not account for ${email}.`,
        data: null
      };
    }

    const emailContent: EmailContentBody = {
      email,
      subject: "Email verification",
      message: `Verify your email ${email} with the code below:`,
      duration: 1
    };

    const result = await sendOtpCode(emailContent);
    return result;
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

const verifyUserEmailWithOtp = async (
  data: VerifyOtpBody
): Promise<ApiResponse<{ email: string; emailVerified: boolean }>> => {
  try {
    const { email } = data;
    const verifyOtpResult = await verifyOtpCode(data);
    if (!verifyOtpResult.data?.isOtpValid) {
      return {
        status: 400,
        message:
          "Invalid data. Please check the email or OTP code and try again.",
        error: verifyOtpResult,
        data: null
      };
    }

    const user = await User.findOne({ where: { email } });
    await user?.update({ verified: true });
    await Otp.destroy({ where: { email } });

    return {
      status: 200,
      message: "Email successfully verified. You can log in now.",
      data: { email: data.email, emailVerified: true },
      error: null
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { sendVerificationOtpEmailCode, verifyUserEmailWithOtp };

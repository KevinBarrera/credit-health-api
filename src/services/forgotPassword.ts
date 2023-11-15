import { Otp, User } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { EmailBody } from "../schemas/email.schemas";
import { ResetPasswordBody } from "../schemas/forgotPassword.schemas";
import { EmailContentBody } from "../schemas/otp.schemas";
import { encrypt } from "../utils/encryption.handle";
import { sendOtpCode, verifyOtpCode } from "./otp";

const sendForgotPasswordOtpCodeEmail = async ({
  email
}: EmailBody): Promise<ApiResponse<OtpData>> => {
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return {
        status: 404,
        message:
          "User not found. Please check your email or register for a new account.",
        data: null,
        error: `User with email ${email} not found.`
      };
    }

    if (!existingUser.verified) {
      return {
        status: 403,
        message: "Email verification is required before change your password.",
        data: null,
        error: `User has not verified the email ${email}.`
      };
    }

    const emailContent: EmailContentBody = {
      email,
      subject: "Reset your password",
      message: "Use the code bellow to reset your password:",
      duration: 1
    };
    const result = await sendOtpCode(emailContent);
    return result;
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

const resetUserPassword = async ({
  email,
  newPassword,
  otp
}: ResetPasswordBody): Promise<
  ApiResponse<{ email: string; passwordUpdated: boolean }>
> => {
  try {
    const verifyOtpResult = await verifyOtpCode({ email, otp });
    if (!verifyOtpResult.data?.isOtpValid) {
      return {
        status: 400,
        message:
          "Invalid data. Please check the email or OTP code and try again.",
        error: verifyOtpResult,
        data: null
      };
    }

    const newPasswordHashed = await encrypt(newPassword);
    const user = await User.findOne({ where: { email } });
    await user?.update({ password: newPasswordHashed });
    await Otp.destroy({ where: { email } });

    return {
      status: 200,
      message:
        "Password successfully reset. You can now log in with your new password.",
      data: { email, passwordUpdated: true },
      error: null
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { sendForgotPasswordOtpCodeEmail, resetUserPassword };

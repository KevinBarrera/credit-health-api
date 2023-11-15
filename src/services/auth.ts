import { User } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { CustomError } from "../interfaces/customError.interface";
import { OtpData } from "../interfaces/otpData.interface";
import { LoginSchemaBody, RegisterSchemaBody } from "../schemas/auth.schemas";
import { encrypt, verify } from "../utils/encryption.handle";
import { generateToken } from "../utils/jwt.handle";
import { sendVerificationOtpEmailCode } from "./emailVerification";

const registerNewUser = async (
  data: RegisterSchemaBody
): Promise<ApiResponse<User | OtpData>> => {
  try {
    const doesUserExist = await User.findOne({ where: { email: data.email } });

    if (doesUserExist) {
      return {
        status: 409,
        message: `Email ${doesUserExist.email} is already in use.`,
        data: null,
        error: null
      };
    }

    const hashedPassword = await encrypt(data.password);
    const newUser = await User.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      lastName: data.lastName,
      password: hashedPassword,
      birthDate: data.birthDate
    });

    const emailProcessResult = await sendVerificationOtpEmailCode({
      email: newUser.email
    });
    if (emailProcessResult.status !== 201) {
      return emailProcessResult;
    }

    return {
      status: 201,
      message: `User with email ${newUser.email} created.`,
      data: newUser,
      error: null
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

const loginUser = async ({ email, password }: LoginSchemaBody) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        status: 404,
        message:
          "User not found. Please check your email or register for a new account.",
        data: null,
        error: `User with email ${email} not found.`
      };
    }
    if (!user.verified) {
      return {
        status: 403,
        message:
          "Email verification is required before logging in. Please check your email for the OTP.",
        data: null,
        error: `User has not verified the email ${email}.`
      };
    }

    const hashedPassword = user.password;
    const doesPasswordMatch = await verify(password, hashedPassword);

    if (!doesPasswordMatch) {
      return {
        status: 401,
        message: `Invalid email or password. Please try again.`,
        data: null,
        error: "Unauthorized"
      };
    }

    const token = generateToken(user.id);

    return {
      status: 200,
      message: `OK.`,
      data: { token, user },
      error: null
    };
  } catch (error) {
    throw new CustomError(500, "Internal server error.", null, error);
  }
};

export { registerNewUser, loginUser };

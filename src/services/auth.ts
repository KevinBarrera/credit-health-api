import { User } from "../config/entityRelations";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { AuthI } from "../interfaces/auth.interface";
import { CustomError } from "../interfaces/customError.interface";
import { UserI } from "../interfaces/user.interface";
import { encrypt, verify } from "../utils/encryption.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async (data: UserI): Promise<ApiResponse<User>> => {
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

const loginUser = async ({ email, password }: AuthI) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        status: 404,
        message: `User with email ${email} not found.`,
        data: null,
        error: null
      };
    }

    const hashedPassword = user.password;
    const doesPasswordMatch = await verify(password, hashedPassword);

    if (!doesPasswordMatch) {
      return {
        status: 401,
        message: `Invalid email or password. Please try again.`,
        data: null,
        error: null
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

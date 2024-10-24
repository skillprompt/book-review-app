import { APIError } from "src/utils/error";
import { UserModel } from "./model";
import { TLoginControllerInput, TRegisterControllerInput } from "./validation";
import { comparePassword, generateToken, hashPassword } from "src/utils/auth";

export async function createUserService(input: TRegisterControllerInput) {
  const { email, username, password } = input;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw APIError.conflict("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new UserModel({
    email,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
}

export async function loginService(input: TLoginControllerInput) {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw APIError.unauthorized("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw APIError.unauthorized("Invalid credentials");
  }

  const token = generateToken({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
    token,
  };
}

export async function logoutService() {
  return true;
}

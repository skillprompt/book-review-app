import { APIError } from "src/utils/error";
import { UserModel } from "./model";
import { TLoginControllerInput, TRegisterControllerInput } from "./validation";

export async function createUserService(input: TRegisterControllerInput) {
  const { email, username, password } = input;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw APIError.conflict("User already exists");
  }

  const newUser = new UserModel({
    email,
    username,
    password,
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

  return user;
}

export async function logoutService() {
  return true;
}
